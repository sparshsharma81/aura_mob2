import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAuthUser } from '@/features/auth/authSlice';
import { loginApi } from '@/services/api/auth.api';
import { SafeAreaScreen } from '@/components/layout/SafeAreaScreen';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await loginApi({ email, password });
      if (data?.success && data?.user) {
        dispatch(setAuthUser(data.user));
        router.replace('/(tabs)/home');
      } else {
        setError(data?.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    router.replace('/(tabs)/home');
    return null;
  }

  return (
    <SafeAreaScreen scroll={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.brand}>Aura+</Text>
            <Text style={styles.subtitle}>Login to see photos and videos from your friends.</Text>
            <View style={styles.form}>
              <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
              <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              {loading ? <Loader /> : <Button title="Login" onPress={submit} />}
              <Text style={styles.footerText}>
                Don’t have an account?{' '}
                <Link href="/(auth)/signup" style={styles.link}>
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f8fc'
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 28,
    gap: 20,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3
  },
  brand: {
    fontSize: 36,
    fontWeight: '900',
    color: '#0f172a'
  },
  subtitle: {
    color: '#64748b',
    lineHeight: 22
  },
  form: {
    gap: 14
  },
  error: {
    color: '#b91c1c'
  },
  footerText: {
    color: '#475569',
    textAlign: 'center'
  },
  link: {
    color: '#0f172a',
    fontWeight: '800'
  }
});
