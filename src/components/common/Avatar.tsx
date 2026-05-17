import { Image, StyleSheet, Text, View } from 'react-native';

type AvatarProps = Readonly<{
  uri?: string;
  name?: string;
  size?: number;
}>;

export function Avatar(props: AvatarProps) {
  const { uri, name, size = 48 } = props;
  if (uri) {
    return <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />;
  }

  const label = (name || '?').slice(0, 1).toUpperCase();
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.fallbackText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#dbe2f0'
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe2f0'
  },
  fallbackText: {
    fontWeight: '700',
    color: '#31415d'
  }
});
