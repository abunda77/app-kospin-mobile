import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { WebViewNavigation } from "react-native-webview";
import { WebView } from "react-native-webview";

// You can change this to any URL you want to show in the WebView
const DEFAULT_URL = "https://pos.kospinsinaraartha.co.id/m/catalog";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setUrl(navState.url);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

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
      reload: () => {
        if (webViewRef.current) {
          webViewRef.current.reload();
          // Tampilkan indikator loading saat manual reload
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        }
      },
      canGoBack: () => canGoBack,
      canGoForward: () => canGoForward,
      getCurrentUrl: () => url,
    };
    return () => {
      global.webViewFunctions = undefined;
    };
  }, [canGoBack, canGoForward, url]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Loading indicator */}
      {isLoading && !refreshing && (
        // Sembunyikan loading utama saat refreshing
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
        </ThemedView>
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors[colorScheme ?? "light"].tint]}
            tintColor={Colors[colorScheme ?? "light"].tint}
            progressViewOffset={60}
          />
        }
        bounces={true}
        alwaysBounceVertical={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
      >
        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => {
            setIsLoading(false);
            setRefreshing(false);
            // Hentikan RefreshControl saat WebView selesai loading
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView HTTP error: ", nativeEvent);
          }}
          showsVerticalScrollIndicator={false}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowsBackForwardNavigationGestures={true}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
          renderLoading={() => <></>} // We handle loading state ourselves
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  webview: {
    flex: 1,
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 100,
  },
});
