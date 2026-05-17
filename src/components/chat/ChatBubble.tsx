import { StyleSheet, Text, View } from 'react-native';
import type { Message } from '@/types/chat';
import { formatDate } from '@/utils/formatDate';

type ChatBubbleProps = Readonly<{
  message: Message;
  isOwn?: boolean;
}>;

export function ChatBubble(props: Readonly<ChatBubbleProps>) {
  const { message, isOwn } = props;
  return (
    <View style={[styles.wrapper, isOwn && styles.ownWrapper]}>
      <View style={[styles.bubble, isOwn && styles.ownBubble]}>
        <Text style={[styles.text, isOwn && styles.ownText]}>{message.message}</Text>
        {message.createdAt ? <Text style={[styles.time, isOwn && styles.ownTime]}>{formatDate(message.createdAt)}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 6
  },
  ownWrapper: {
    justifyContent: 'flex-end'
  },
  bubble: {
    maxWidth: '82%',
    backgroundColor: '#e2e8f0',
    borderRadius: 18,
    padding: 12
  },
  ownBubble: {
    backgroundColor: '#0f172a'
  },
  text: {
    color: '#0f172a'
  },
  ownText: {
    color: '#fff'
  },
  time: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 11
  },
  ownTime: {
    color: '#cbd5e1'
  }
});
