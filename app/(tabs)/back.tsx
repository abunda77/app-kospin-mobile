import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import ArrowBack from '../../assets/images/arrow_back.svg';

// Tambahkan deklarasi global untuk webViewFunctions dan webViewHistory
interface WebViewFunctions {
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
  getCurrentUrl?: () => string;
  navigateTo?: (url: string) => void;
}
declare global {
  // eslint-disable-next-line no-var
  var webViewFunctions: WebViewFunctions | undefined;
  var webViewHistory: string[] | undefined;
}

export default function BackScreen() {
  const router = useRouter();
  const spinAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pastikan global.webViewHistory ada
    if (!global.webViewHistory) global.webViewHistory = [];

    // Fungsi back: ambil history sebelumnya
    if (global.webViewHistory.length > 1) {
      // Hapus halaman terakhir (current)
      global.webViewHistory.pop();
      // Ambil halaman sebelumnya
      const prevUrl = global.webViewHistory[global.webViewHistory.length - 1];
      if (global.webViewFunctions && prevUrl) {
        // Fallback: gunakan goBack jika navigateTo tidak ada
        if (typeof global.webViewFunctions.navigateTo === 'function') {
          global.webViewFunctions.navigateTo(prevUrl);
        } else {
          global.webViewFunctions.goBack();
        }
      }
    } else if (global.webViewFunctions) {
      global.webViewFunctions.goBack();
    }

    // Kembali ke tab utama
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Just a fallback view that users briefly see
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }], marginBottom: 16 }}>
        <ArrowBack width={48} height={48} accessibilityLabel="Back Icon" />
      </Animated.View>
      <Text style={styles.text}>Going back...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});
