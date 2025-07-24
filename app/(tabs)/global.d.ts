// Add WebView Functions to global types
declare global {
  var webViewFunctions: {
    goBack: () => void;
    goForward: () => void;
    canGoBack: () => boolean;
    canGoForward: () => boolean;
  } | undefined;
}

export { };

