import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { User } from '@/types/user';

type ProfileHeaderProps = Readonly<{
  user: User;
}>;

export function ProfileHeader({ user }: Readonly<ProfileHeaderProps>) {
  return (
    <View style={styles.container}>
      <Avatar uri={user.profilePicture} name={user.username} size={84} />
      <View style={{ alignItems: 'center', gap: 4 }}>
        <Text style={styles.name}>{user.username}</Text>
        {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a'
  },
  bio: {
    color: '#475569',
    textAlign: 'center'
  }
});
