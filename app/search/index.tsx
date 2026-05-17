import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { SearchBar } from '@/components/search/SearchBar';
import { SuggestedUserCard } from '@/components/search/SuggestedUserCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';
import { searchUsersApi } from '@/services/api/users.api';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || '');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        const data = await searchUsersApi(query);
        if (mounted) {
          setUsers(data?.users || []);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }, 350);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Search" />
      <View style={styles.content}>
        <SearchBar value={query} onChangeText={setQuery} />
        {loading ? <Loader /> : users.length ? <ScrollView>{users.map((user) => <SuggestedUserCard key={user._id} user={user} onPress={() => router.push(`/profile/${user._id}`)} onMessage={() => router.push(`/chat/${user._id}`)} onFollow={() => router.push(`/profile/${user._id}`)} />)}</ScrollView> : <EmptyState title="Search users" subtitle="Type a username to find people on Aura." />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  content: {
    padding: 16,
    gap: 14
  }
});
