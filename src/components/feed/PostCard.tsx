import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { formatCount } from '@/utils/formatCount';
import { formatDate } from '@/utils/formatDate';
import type { Post } from '@/types/post';

type PostCardProps = {
  post: Post;
  onPress?: () => void;
  onLike?: () => void;
  onComment?: () => void;
};

export function PostCard(props: Readonly<PostCardProps>) {
  const { post, onPress, onLike, onComment } = props;
  const likes = post.likes?.length || 0;
  const comments = post.comments?.length || 0;

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.header}>
        <Avatar uri={post.author?.profilePicture} name={post.author?.username} size={44} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{post.author?.username}</Text>
          <Text style={styles.meta}>{formatDate(post.createdAt)}</Text>
        </View>
      </Pressable>

      <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.body}>
        {post.caption ? <Text style={styles.caption}>{post.caption}</Text> : null}
        <Text style={styles.stats}>{formatCount(likes)} likes · {formatCount(comments)} comments</Text>
        <View style={styles.actions}>
          <Button title="Like" variant="secondary" onPress={onLike} style={styles.actionButton} />
          <Button title="Comment" variant="secondary" onPress={onComment} style={styles.actionButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 16
  },
  username: {
    fontWeight: '800',
    color: '#0f172a'
  },
  meta: {
    color: '#64748b',
    marginTop: 2,
    fontSize: 12
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#e2e8f0'
  },
  body: {
    padding: 16,
    gap: 10
  },
  caption: {
    color: '#0f172a',
    lineHeight: 20
  },
  stats: {
    color: '#64748b',
    fontSize: 12
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {
    flex: 1
  }
});
