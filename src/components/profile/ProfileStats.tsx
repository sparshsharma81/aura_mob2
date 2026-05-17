import { StyleSheet, Text, View } from 'react-native';

type ProfileStatsProps = Readonly<{
  posts: number;
  followers: number;
  following: number;
}>;

export function ProfileStats({ posts, followers, following }: Readonly<ProfileStatsProps>) {
  const cells = [
    { label: 'Posts', value: posts },
    { label: 'Followers', value: followers },
    { label: 'Following', value: following }
  ];

  return (
    <View style={styles.row}>
      {cells.map((cell) => (
        <View key={cell.label} style={styles.cell}>
          <Text style={styles.value}>{cell.value}</Text>
          <Text style={styles.label}>{cell.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 16
  },
  cell: {
    alignItems: 'center',
    gap: 4
  },
  value: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a'
  },
  label: {
    color: '#64748b',
    fontSize: 12
  }
});
