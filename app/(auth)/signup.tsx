import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaScreen } from '@/components/layout/SafeAreaScreen';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { registerApi } from '@/services/api/auth.api';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await registerApi({ username, email, password });
      if (data?.success) {
        router.replace('/(auth)/login');
      } else {
        setError(data?.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaScreen scroll={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.brand}>Create the account</Text>
            <Text style={styles.subtitle}>Join Aura and start posting instantly.</Text>
            <View style={styles.form}>
              <Input value={username} onChangeText={setUsername} placeholder="Username" autoCapitalize="none" />
              <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
              <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              {loading ? <Loader /> : <Button title="Sign up" onPress={submit} />}
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Link href="/(auth)/login" style={styles.link}>
                  Log in
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
    gap: 20
  },
  brand: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a'
  },
  subtitle: {
    color: '#64748b'
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
