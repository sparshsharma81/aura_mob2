import { View, Text, StyleSheet } from 'react-native';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function EditPostScreen() {
  return (
    <View style={styles.screen}>
      <ScreenHeader title="Edit post" />
      <EmptyState title="Post editing is not exposed by the backend yet" subtitle="This screen is reserved for future post update support." />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  }
});
