import type { ExpoConfig } from 'expo/config';

const apiUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_URL ||
  process.env.VITE_URL ||
  process.env.URL ||
  'http://localhost:5000';

const config: ExpoConfig = {
  name: 'Aura Mobile',
  slug: 'aura-mobile',
  scheme: 'aura-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'light',
  assetBundlePatterns: ['**/*'],

  android: {
    package: 'com.spars.auramobile'
  },

  ios: {
    bundleIdentifier: 'com.spars.auramobile',
    supportsTablet: true
  },

  plugins: ['expo-router'],

  extra: {
    apiUrl,

    eas: {
      projectId: 'ca93d73a-09ba-4857-8828-52eb25871373'
    }
  }
};

export default config;