import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/common/Avatar';
import type { User } from '@/types/user';

type ChatHeaderProps = Readonly<{
  user: User;
  subtitle?: string;
}>;

export function ChatHeader(props: Readonly<ChatHeaderProps>) {
  const { user, subtitle } = props;
  return (
    <View style={styles.container}>
      <Avatar uri={user.profilePicture} name={user.username} size={42} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{user.username}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 12
  },
  name: {
    fontWeight: '800',
    color: '#0f172a'
  },
  subtitle: {
    color: '#64748b',
    marginTop: 2,
    fontSize: 12
  }
});
