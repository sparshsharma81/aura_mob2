import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { CommentItem } from './CommentItem';
import type { Comment } from '@/types/post';

type CommentSheetProps = Readonly<{
  comments: Comment[];
  onSubmit: (text: string) => Promise<void> | void;
  title?: string;
}>;

export function CommentSheet(props: CommentSheetProps) {
  const { comments, onSubmit, title = 'Comments' } = props;
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 16 }}>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </ScrollView>
      <View style={styles.form}>
        <Input value={text} onChangeText={setText} placeholder="Add a comment" />
        <Button title="Send" onPress={() => { onSubmit(text); setText(''); }} disabled={!text.trim()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    gap: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a'
  },
  list: {
    maxHeight: 300
  },
  form: {
    gap: 10
  }
});
