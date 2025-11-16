# Project Structure

## Folder Organization

```
app/                    # File-based routing (expo-router)
├── (tabs)/            # Tab navigation group
│   ├── _layout.tsx    # Tab bar configuration
│   ├── index.tsx      # Home screen with WebView
│   ├── back.tsx       # Navigate back in WebView
│   ├── forward.tsx    # Navigate forward in WebView
│   └── quit.tsx       # Exit application
├── _layout.tsx        # Root layout with theme provider
└── +not-found.tsx     # 404 fallback page

components/            # Reusable UI components
├── ui/               # UI component library
├── ThemedText.tsx    # Text with theme support
├── ThemedView.tsx    # View with theme support
└── [other components]

constants/            # Global constants
└── Colors.ts         # Theme color definitions

hooks/                # Custom React hooks
├── useColorScheme.ts     # Color scheme detection
├── useColorScheme.web.ts # Web-specific color scheme
└── useThemeColor.ts      # Theme color resolver

assets/               # Static assets
├── fonts/           # Custom fonts (SpaceMono)
└── images/          # App icons and splash screens

scripts/             # Build and utility scripts
└── reset-project.js # Project reset utility
```

## Architecture Patterns

### File-Based Routing
- Routes are defined by file structure in `app/` directory
- Folders with parentheses like `(tabs)` create route groups without adding path segments
- `_layout.tsx` files define nested layouts
- Files starting with `+` are special routes (e.g., `+not-found.tsx`)

### Theming
- Use `ThemedText` and `ThemedView` components for automatic theme support
- Access theme colors via `useThemeColor` hook
- Color scheme detection via `useColorScheme` hook
- Theme definitions in `constants/Colors.ts`

### Path Aliases
- Use `@/` prefix to import from project root
- Example: `import { ThemedView } from "@/components/ThemedView"`

### WebView State Management
- WebView functions exposed via `global.webViewFunctions` for cross-screen access
- Navigation state tracked in home screen and shared globally
- Avoid complex state management libraries for this simple use case

## Naming Conventions

- Component files: PascalCase (e.g., `ThemedText.tsx`)
- Hook files: camelCase with `use` prefix (e.g., `useThemeColor.ts`)
- Route files: lowercase (e.g., `index.tsx`, `back.tsx`)
- Layout files: `_layout.tsx`
- Type definitions: `types/` subfolder or inline with components
