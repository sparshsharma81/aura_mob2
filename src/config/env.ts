import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined;

const envApiUrl =
	process.env.EXPO_PUBLIC_API_URL ||
	process.env.EXPO_PUBLIC_URL ||
	process.env.VITE_URL ||
	process.env.URL;

export const API_URL = envApiUrl || extra?.apiUrl || 'http://localhost:5000';
export const SOCKET_URL = API_URL;
