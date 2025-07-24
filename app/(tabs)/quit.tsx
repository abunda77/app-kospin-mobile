import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, Platform, StyleSheet, Text, View } from 'react-native';

export default function QuitScreen() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // On web, we can attempt to close the window
      window.close();
      
      // Fallback if window.close() doesn't work due to security restrictions
      router.replace('/(tabs)');
    } else {
      // On mobile, we show an alert and attempt to exit
      Alert.alert(
        "Exit App",
        "Do you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => router.replace('/(tabs)'),
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: () => {
              // Try to exit the app on Android
              if (Platform.OS === 'android') {
                BackHandler.exitApp();
              } else {
                // On iOS, just go back to home as true exit is not possible
                router.replace('/(tabs)');
              }
            } 
          }
        ]
      );
    }
    
    // Just in case nothing else works, go back to home after a delay
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exiting application...</Text>
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
