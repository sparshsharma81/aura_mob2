import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ConversationListItem } from '@/components/chat/ConversationListItem';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppSelector } from '@/store/hooks';
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';

export default function MessagesScreen() {
  const { suggestedUsers } = useSuggestedUsers();
  const { messages, onlineUsers } = useAppSelector((state) => state.chat);
  const user = useAppSelector((state) => state.auth.user);

  const conversations = useMemo(() => {
    const map = new Map<string, { user: any; lastMessage: any }>();

    suggestedUsers.forEach((item) => {
      map.set(String(item._id), { user: item, lastMessage: null });
    });

    messages.forEach((message) => {
      if (!user?._id) return;
      const me = String(user._id);
      const sender = String(message.senderId);
      const receiver = String(message.receiverId);
      let otherId: string | null = null;
      if (sender === me && receiver !== me) {
        otherId = receiver;
      } else if (receiver === me && sender !== me) {
        otherId = sender;
      }
      if (!otherId) return;

      const existing = map.get(otherId) || { user: { _id: otherId, username: 'Unknown' }, lastMessage: null };
      if (!existing.lastMessage || new Date(message.createdAt || '').getTime() > new Date(existing.lastMessage.createdAt || '').getTime()) {
        existing.lastMessage = message;
      }
      map.set(otherId, existing);
    });

    return Array.from(map.values()).filter((item) => item.lastMessage || item.user);
  }, [messages, suggestedUsers, user?._id]);

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Messages" />
      {conversations.length ? (
        <ScrollView contentContainerStyle={styles.list}>
          {conversations.map((item) => (
            <ConversationListItem key={item.user._id} item={item} isOnline={onlineUsers.includes(item.user._id)} onPress={() => router.push(`/chat/${item.user._id}`)} />
          ))}
        </ScrollView>
      ) : (
        <EmptyState title="No conversations yet" subtitle="Start a chat from a profile or suggested user." />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 24
  }
});
