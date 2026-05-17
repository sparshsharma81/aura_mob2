import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { NotificationItem as NotificationShape } from '@/types/notification';

type NotificationItemProps = Readonly<{
  item: NotificationShape;
}>;

export function NotificationItem({ item }: NotificationItemProps) {
  return (
    <View style={styles.row}>
      <Avatar uri={item.userDetails?.profilePicture} name={item.userDetails?.username} size={38} />
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12
  },
  text: {
    flex: 1,
    color: '#0f172a'
  }
});
