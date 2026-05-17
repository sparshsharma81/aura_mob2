import { FlatList, View } from 'react-native';
import type { Post } from '@/types/post';
import { PostCard } from './PostCard';

type FeedListProps = {
  posts: Post[];
  onLikePost?: (post: Post) => void;
  onCommentPost?: (post: Post) => void;
  onOpenPost?: (post: Post) => void;
};

export function FeedList(props: Readonly<FeedListProps>) {
  const { posts, onLikePost, onCommentPost, onOpenPost } = props;
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onPress={() => onOpenPost?.(item)}
          onLike={() => onLikePost?.(item)}
          onComment={() => onCommentPost?.(item)}
        />
      )}
      contentContainerStyle={{ paddingTop: 8, paddingBottom: 28 }}
      ListEmptyComponent={<View style={{ height: 200 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
