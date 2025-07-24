import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import ArrowForward from '../../assets/images/arrow_forward.svg';

export default function ForwardScreen() {
  const router = useRouter();
  const spinAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    // Fungsi forward: ambil history berikutnya
    if (global.webViewFunctions && global.webViewHistory) {
      const currentIndex = global.webViewHistory.findIndex(
        url => global.webViewFunctions && url === global.webViewFunctions.getCurrentUrl?.()
      );
      const nextUrl = global.webViewHistory[currentIndex + 1];
      if (nextUrl) {
        if (global.webViewFunctions.navigateTo) {
          global.webViewFunctions.navigateTo(nextUrl);
        }
      } else {
        global.webViewFunctions.goForward();
      }
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
        <ArrowForward width={48} height={48} accessibilityLabel="Forward Icon" />
      </Animated.View>
      <Text style={styles.text}>Going forward...</Text>
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
