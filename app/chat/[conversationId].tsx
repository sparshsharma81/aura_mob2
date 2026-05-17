import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMessages } from '@/hooks/useMessages';
import { sendMessageApi } from '@/services/api/chat.api';
import { addOrUpdateMessage } from '@/features/chat/chatSlice';

export default function ChatScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const suggestedUsers = useAppSelector((state) => state.auth.suggestedUsers);
  const socket = useAppSelector((state) => state.socketio.socket);
  const dispatch = useAppDispatch();
  const receiver = useMemo(() => suggestedUsers.find((item) => item._id === conversationId) || { _id: conversationId, username: 'Chat' }, [conversationId, suggestedUsers]);
  const { messages } = useMessages(conversationId);
  const [text, setText] = useState('');

  const send = async () => {
    if (!conversationId || !user?._id || !text.trim()) return;
    const tempId = `temp-${Date.now()}`;
    dispatch(addOrUpdateMessage({ message: { tempId, senderId: user._id, receiverId: conversationId, message: text, status: 'sending', createdAt: new Date().toISOString() }, tempId }));
    const payload = text;
    setText('');

    try {
      const data = await sendMessageApi(conversationId, payload);
      if (data?.success && data?.newMessage) {
        dispatch(addOrUpdateMessage({ message: { ...data.newMessage, status: 'delivered' }, tempId }));
        socket?.emit('sendMessage', data.newMessage);
      }
    } catch {
      dispatch(addOrUpdateMessage({ message: { tempId, senderId: user._id, receiverId: conversationId, message: payload, status: 'failed' }, tempId }));
    }
  };

  if (!conversationId) {
    return <EmptyState title="Conversation not found" />;
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Chat" />
      <View style={styles.container}>
        <ChatHeader user={receiver as any} subtitle={user?._id ? 'Secure direct message' : undefined} />
        <ScrollView contentContainerStyle={styles.messages}>
          {messages.length ? messages.map((message) => <ChatBubble key={message._id || message.tempId} message={message} isOwn={String(message.senderId) === String(user?._id)} />) : <EmptyState title="Start the conversation" subtitle="Send the first message to this user." />}
        </ScrollView>
        <ChatInput value={text} onChangeText={setText} onSend={send} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16
  },
  messages: {
    flexGrow: 1,
    paddingVertical: 12
  }
});
