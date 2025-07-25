import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, Platform, StyleSheet, Text, View } from 'react-native';

export default function QuitScreen() {
  const router = useRouter();

  useEffect(() => {
    let timer: any;

    if (Platform.OS === 'web') {
      // On web, we can attempt to close the window
      window.close();
      
      // Fallback if window.close() doesn't work due to security restrictions
      timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);
    } else {
      // On mobile, we show an alert and attempt to exit
      Alert.alert(
        "Exit App",
        "Do you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => {
              clearTimeout(timer);
              router.replace('/(tabs)');
            },
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: () => {
              clearTimeout(timer);
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

      // Fallback timer for mobile in case alert is dismissed unexpectedly
      timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 5000); // Longer timeout for user interaction
    }

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
