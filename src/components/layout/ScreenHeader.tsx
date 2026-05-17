import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = Readonly<{
  title: string;
  right?: ReactNode;
}>;

export function ScreenHeader({ title, right }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a'
  }
});
