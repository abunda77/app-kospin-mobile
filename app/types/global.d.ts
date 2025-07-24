// Ambient declaration for global.webViewFunctions

declare global {
  interface Global {
    webViewFunctions?: {
      goBack: () => void;
      goForward: () => void;
      reload: () => void;
      canGoBack: () => boolean;
      canGoForward: () => boolean;
      navigateTo?: (url: string) => void;
      getCurrentUrl?: () => string;
    };
  }
}

declare module '*.svg' {
  import * as React from 'react';
    import { SvgProps } from 'react-native-svg';
  const ReactComponent: React.FC<SvgProps>;
  export default ReactComponent;
}

export default function Global() { return null; }

export { };

