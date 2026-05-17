import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type ButtonProps = Readonly<{
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}>;

export function Button({ title, onPress, variant = 'primary', disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText, variant === 'ghost' && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  secondary: {
    backgroundColor: '#e2e8f0'
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    transform: [{ scale: 0.985 }]
  },
  text: {
    color: '#fff',
    fontWeight: '700'
  },
  secondaryText: {
    color: '#0f172a'
  },
  ghostText: {
    color: '#0f172a'
  }
});
