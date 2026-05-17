import { StyleSheet, View } from 'react-native';
import { useFeed } from '@/hooks/useFeed';
import { ExploreGrid } from '@/components/explore/ExploreGrid';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';
import { router } from 'expo-router';

export default function ExploreScreen() {
  const { posts, loading } = useFeed();

  let content = <EmptyState title="Nothing to explore yet" subtitle="Posts will appear here once the feed is loaded." />;

  if (loading) {
    content = <Loader />;
  } else if (posts.length) {
    content = <ExploreGrid posts={posts} onPressPost={(post) => router.push(`/post/${post._id}`)} />;
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Explore" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  }
});
