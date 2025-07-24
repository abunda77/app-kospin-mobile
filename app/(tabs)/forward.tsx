import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ForwardScreen() {
  const router = useRouter();

  useEffect(() => {
    // Check if webViewFunctions exists and go forward
    if (global.webViewFunctions) {
      global.webViewFunctions.goForward();
    }
    
    // Navigate back to the main tab
    const timer = setTimeout(() => {
      router.replace('/(tabs)/');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [router]);

  // Just a fallback view that users briefly see
  return (
    <View style={styles.container}>
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
