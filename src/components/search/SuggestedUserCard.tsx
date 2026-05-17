import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import type { User } from '@/types/user';

type SuggestedUserCardProps = Readonly<{
  user: User;
  onPress?: () => void;
  onMessage?: () => void;
  onFollow?: () => void;
}>;

export function SuggestedUserCard({ user, onPress, onMessage, onFollow }: SuggestedUserCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Avatar uri={user.profilePicture} name={user.username} size={48} />
      <View style={{ flex: 1, gap: 8 }}>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.actions}>
          <Button title="Follow" onPress={onFollow} style={styles.actionButton} />
          <Button title="Message" variant="secondary" onPress={onMessage} style={styles.actionButton} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12
  },
  username: {
    fontWeight: '800',
    color: '#0f172a'
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {
    flex: 1,
    minHeight: 40
  }
});
