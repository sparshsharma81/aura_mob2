import { ActivityIndicator, View } from 'react-native';

export function Loader() {
  return (
    <View style={{ padding: 24 }}>
      <ActivityIndicator size="large" color="#0f172a" />
    </View>
  );
}
