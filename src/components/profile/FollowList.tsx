import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { User } from '@/types/user';

type FollowListProps = Readonly<{
  title: string;
  users: User[];
}>;

export function FollowList({ title, users }: FollowListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
        {users.map((user) => (
          <View key={user._id} style={styles.row}>
            <Avatar uri={user.profilePicture} name={user.username} size={40} />
            <Text style={styles.username}>{user.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10
  },
  username: {
    color: '#0f172a',
    fontWeight: '600'
  }
});
