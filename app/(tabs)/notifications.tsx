import { ScrollView, StyleSheet, View } from 'react-native';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppSelector } from '@/store/hooks';

export default function NotificationsScreen() {
  const likeNotifications = useAppSelector((state) => state.realTimeNotification.likeNotification);
  const messageNotifications = useAppSelector((state) => state.realTimeNotification.messageNotifications);
  const all = [...likeNotifications, ...messageNotifications];

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Notifications" />
      {all.length ? (
        <ScrollView contentContainerStyle={styles.list}>
          {all.map((item, index) => (
            <NotificationItem key={`${item.type}-${item.userId}-${index}`} item={item} />
          ))}
        </ScrollView>
      ) : (
        <EmptyState title="No notifications" subtitle="Likes and messages will appear here in real time." />
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
    borderRadius: 24,
    padding: 16
  }
});
