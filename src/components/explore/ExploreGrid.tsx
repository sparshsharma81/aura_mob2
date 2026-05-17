import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import type { Post } from '@/types/post';

type ExploreGridProps = Readonly<{
  posts: Post[];
  onPressPost?: (post: Post) => void;
}>;

export function ExploreGrid(props: ExploreGridProps) {
  const { posts, onPressPost } = props;
  return (
    <FlatList
      data={posts}
      numColumns={3}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressPost?.(item)} style={styles.cell}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 2
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#e2e8f0'
  }
});
