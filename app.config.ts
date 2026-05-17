import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Aura Mobile',
  slug: 'aura-mobile',
  scheme: 'aura-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'light',
  assetBundlePatterns: ['**/*'],

  ios: {
    supportsTablet: true
  },

  plugins: ['expo-router'],

  extra: {
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL ||
      'http://192.168.1.19:5000',

    eas: {
      projectId: 'ca93d73a-09ba-4857-8828-52eb25871373'
    }
  }
};

export default config;