# Sinara POS Expo App

Aplikasi ini adalah project [Expo React Native](https://expo.dev) untuk POS Kospin Sinara Artha, menggunakan [expo-router](https://expo.dev/router) dan WebView untuk mengakses aplikasi web POS.

## Struktur Project

- **app/**: Folder utama berisi file routing dan tampilan aplikasi.
  - **_layout.tsx**: Root layout, mengatur tema dan navigasi utama.
  - **+not-found.tsx**: Halaman fallback jika route tidak ditemukan.
  - **(tabs)/**: Folder tab utama aplikasi.
    - **_layout.tsx**: Layout tab, menampilkan tab Home, Back, Forward, Quit.
    - **index.tsx**: Tab utama, menampilkan WebView ke POS Kospin Sinara Artha.
    - **back.tsx**: Tab untuk navigasi mundur WebView.
    - **forward.tsx**: Tab untuk navigasi maju WebView.
    - **quit.tsx**: Tab untuk keluar dari aplikasi.
    - **global.d.ts**: Deklarasi global untuk fungsi WebView.

- **components/**: Komponen UI custom (ThemedText, ThemedView, ParallaxScrollView, dll).
- **constants/**: Konstanta global (misal: Colors).
- **hooks/**: Custom hooks (misal: useThemeColor, useColorScheme).
- **assets/**: Gambar, font, dan aset statis.

## Cara Menjalankan

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npx expo start
   ```

Aplikasi akan menampilkan WebView ke POS Kospin Sinara Artha pada tab utama. Navigasi tab Back/Forward/Exit dapat digunakan untuk mengontrol WebView.

## Fitur Utama
- WebView ke POS Kospin Sinara Artha
- Navigasi tab: Home, Back, Forward, Quit
- Tema otomatis (light/dark)
- Komponen UI custom
- File-based routing dengan expo-router

## Reset Project

Untuk memulai project baru dari blank, jalankan:
```bash
npm run reset-project
```
Script ini akan memindahkan kode starter ke folder **app-example** dan membuat folder **app** kosong.

## Dokumentasi & Referensi
- [Expo documentation](https://docs.expo.dev/)
- [expo-router](https://expo.dev/router)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Panduan Expo Go & Build AAB](./EXPOGO.md)

## Komunitas
- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
