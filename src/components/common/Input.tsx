import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export const Input = forwardRef<TextInput, TextInputProps>(function Input(props, ref) {
  return (
    <View style={styles.wrapper}>
      <TextInput ref={ref} placeholderTextColor="#8291a8" {...props} style={[styles.input, props.style]} />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  input: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d5dbea',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    color: '#0f172a'
  }
});
