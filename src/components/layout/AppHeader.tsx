import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export function AppHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Aura+</Text>
      <Pressable onPress={() => router.push('/search')}>
        <Ionicons name="search" size={28} color="#0f172a" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0f172a'
  },
});
