# Technology Stack

## Framework & Runtime

- **Expo SDK 53** with React Native 0.79.2
- **React 19.0.0** with TypeScript 5.8.3
- **expo-router 5.0.5** for file-based routing
- **New Architecture enabled** for improved performance

## Key Libraries

- `react-native-webview` (13.13.5) - Core WebView functionality
- `@react-navigation/native` & `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-reanimated` (3.17.4) - Animations
- `react-native-gesture-handler` (2.24.0) - Touch interactions
- `expo-haptics` - Haptic feedback
- `expo-splash-screen` - Splash screen management

## Build System

- **Metro bundler** for JavaScript bundling
- **EAS Build** (project ID: ee98fe35-5d73-4c74-b4b8-f229a976f269)
- **Babel** for transpilation
- **ESLint** with expo config for linting

## Common Commands

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator
npm run web            # Run in web browser

# Code Quality
npm run lint           # Run ESLint

# Project Management
npm run reset-project  # Reset to blank project (moves code to app-example/)
```

## TypeScript Configuration

- Strict mode enabled
- Path alias `@/*` maps to project root
- Typed routes enabled via Expo experiments
