import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useSocket } from '@/hooks/useSocket';

function NavigationGate() {
  const user = useAppSelector((state) => state.auth.user);
  const segments = useSegments();
  const router = useRouter();

  useSocket();

  useEffect(() => {
    if (!segments.length) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
      return;
    }

    if (user && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [router, segments, user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="dark" />
        <NavigationGate />
      </Provider>
    </GestureHandlerRootView>
  );
}
