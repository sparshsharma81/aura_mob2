import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/layout/AppHeader';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { FeedList } from '@/components/feed/FeedList';
import { SuggestedUserCard } from '@/components/search/SuggestedUserCard';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { useFeed } from '@/hooks/useFeed';
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';
import { likePostApi } from '@/services/api/posts.api';
import { followUserApi } from '@/services/api/users.api';

export default function HomeScreen() {
  const { posts, loading, refresh } = useFeed();
  const { suggestedUsers } = useSuggestedUsers();

  const toggleLike = async (post: any) => {
    await likePostApi(post._id);
    await refresh();
  };

  const openPost = (post: any) => router.push(`/post/${post._id}`);

  let feedContent = <EmptyState title="No posts yet" subtitle="Follow people to fill your feed." />;

  if (loading) {
    feedContent = <Loader />;
  } else if (posts.length) {
    feedContent = <FeedList posts={posts} onLikePost={toggleLike} onCommentPost={openPost} onOpenPost={openPost} />;
  }

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScreenHeader title="For you" />
      <FlatList
        data={suggestedUsers.slice(0, 5)}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestions}
        renderItem={({ item }) => (
          <View style={styles.suggestionWrap}>
            <SuggestedUserCard
              user={item}
              onPress={() => router.push(`/profile/${item._id}`)}
              onMessage={() => router.push(`/chat/${item._id}`)}
              onFollow={async () => {
                await followUserApi(item._id);
              }}
            />
          </View>
        )}
      />
      {feedContent}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  suggestions: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 8
  },
  suggestionWrap: {
    width: 280
  }
});
