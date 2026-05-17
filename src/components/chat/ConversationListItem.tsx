import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { ConversationPreview } from '@/types/chat';
import { formatDate } from '@/utils/formatDate';

type ConversationListItemProps = Readonly<{
  item: ConversationPreview;
  isOnline?: boolean;
  onPress?: () => void;
}>;

export function ConversationListItem(props: Readonly<ConversationListItemProps>) {
  const { item, isOnline, onPress } = props;
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Avatar uri={item.user.profilePicture} name={item.user.username} size={52} />
      <View style={{ flex: 1 }}>
        <View style={styles.topLine}>
          <Text style={styles.name}>{item.user.username}</Text>
          {item.lastMessage?.createdAt ? <Text style={styles.time}>{formatDate(item.lastMessage.createdAt)}</Text> : null}
        </View>
        <Text style={styles.message} numberOfLines={1}>{item.lastMessage?.message || 'Say hi'}</Text>
        {isOnline ? <Text style={styles.online}>Online</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  name: {
    fontWeight: '800',
    color: '#0f172a'
  },
  time: {
    color: '#94a3b8',
    fontSize: 12
  },
  message: {
    color: '#475569',
    marginTop: 4
  },
  online: {
    color: '#2563eb',
    fontSize: 12,
    marginTop: 4
  }
});
