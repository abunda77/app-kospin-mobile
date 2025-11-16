# Sinara POS Expo App

Aplikasi React Native untuk POS Kospin Sinara Artha, menggunakan [Expo](https://expo.dev) dengan [expo-router](https://expo.dev/router) dan WebView untuk mengakses aplikasi web POS.

## Tech Stack

- **Expo SDK 53** dengan React Native 0.79.2
- **React 19.0.0** dengan TypeScript 5.8.3
- **expo-router 5.0.5** untuk file-based routing
- **react-native-webview 13.13.5** untuk WebView
- **New Architecture enabled**

## Struktur Project

```
app/                    # File-based routing (expo-router)
├── (tabs)/            # Tab navigation group
│   ├── _layout.tsx    # Tab bar configuration
│   ├── index.tsx      # Home screen dengan WebView
│   ├── back.tsx       # Navigate back
│   ├── forward.tsx    # Navigate forward
│   └── quit.tsx       # Exit application
├── _layout.tsx        # Root layout dengan theme provider
└── +not-found.tsx     # 404 fallback

components/            # Reusable UI components
├── ThemedText.tsx    # Text dengan theme support
├── ThemedView.tsx    # View dengan theme support
└── [other components]

constants/            # Global constants
└── Colors.ts         # Theme color definitions

hooks/                # Custom React hooks
├── useColorScheme.ts
└── useThemeColor.ts

assets/               # Static assets
├── fonts/           # Custom fonts
└── images/          # App icons dan splash screens
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator
npm run web        # Web browser

# Code quality
npm run lint       # Run ESLint
```

## Fitur Utama

- WebView ke `https://pos.kospinsinaraartha.co.id/m/catalog`
- Tab navigation: Home, Back, Forward, Quit
- WebView history management dengan animasi
- Pull-to-refresh functionality
- Automatic theme support (light/dark)
- Error handling dan loading states
- Exit confirmation dialog

## Architecture Patterns

### File-Based Routing
Routes didefinisikan oleh struktur file di `app/` directory. Folders dengan parentheses seperti `(tabs)` membuat route groups tanpa menambah path segments.

### Theming
Gunakan `ThemedText` dan `ThemedView` components untuk automatic theme support. Access theme colors via `useThemeColor` hook.

### Path Aliases
Gunakan `@/` prefix untuk import dari project root:
```typescript
import { ThemedView } from "@/components/ThemedView";
```

### WebView State Management
WebView functions di-expose via `global.webViewFunctions` untuk cross-screen access, menghindari kompleksitas state management libraries.

## Build & Deployment

Project menggunakan **EAS Build** (Project ID: `ee98fe35-5d73-4c74-b4b8-f229a976f269`).

Untuk panduan lengkap build AAB, lihat [EXPOGO.md](./EXPOGO.md).

## Referensi

- [Expo Documentation](https://docs.expo.dev/)
- [expo-router](https://expo.dev/router)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Expo GitHub](https://github.com/expo/expo)
- [Discord Community](https://chat.expo.dev)
