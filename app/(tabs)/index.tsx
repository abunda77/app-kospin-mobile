import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { WebViewNavigation } from 'react-native-webview';
import { WebView } from 'react-native-webview';

// You can change this to any URL you want to show in the WebView
const DEFAULT_URL = 'https://pos.kospinsinaraartha.co.id';

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setUrl(navState.url);
  };

  // We'll export these functions and reference states for other screens
  React.useEffect(() => {
    // Expose webview functions to global scope for tab navigation
    // This is a simple way to share functionality between screens without context/redux
    global.webViewFunctions = {
      goBack: () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
        }
      },
      goForward: () => {
        if (canGoForward && webViewRef.current) {
          webViewRef.current.goForward();
        }
      },
      canGoBack: () => canGoBack,
      canGoForward: () => canGoForward
    };

    return () => {
      global.webViewFunctions = undefined;
    };
  }, [canGoBack, canGoForward]);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Loading indicator */}
      {isLoading && (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={Colors[colorScheme ?? 'light'].tint} 
          />
        </ThemedView>
      )}
      
      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        renderLoading={() => <></>} // We handle loading state ourselves
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 100,
  },
});
