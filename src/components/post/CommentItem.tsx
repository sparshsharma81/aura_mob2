import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { Comment } from '@/types/post';

type CommentItemProps = Readonly<{
  comment: Comment;
}>;

export function CommentItem(props: CommentItemProps) {
  const { comment } = props;
  return (
    <View style={styles.row}>
      <Avatar uri={comment.author?.profilePicture} name={comment.author?.username} size={34} />
      <View style={styles.content}>
        <Text style={styles.username}>{comment.author?.username}</Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
    alignItems: 'flex-start'
  },
  content: {
    flex: 1
  },
  username: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2
  },
  text: {
    color: '#334155',
    lineHeight: 20
  }
});
