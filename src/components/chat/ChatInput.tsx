import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

type ChatInputProps = Readonly<{
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}>;

export function ChatInput(props: ChatInputProps) {
  const { value, onChangeText, onSend } = props;
  return (
    <View style={styles.row}>
      <Input value={value} onChangeText={onChangeText} placeholder="Message..." style={styles.input} />
      <Button title="Send" onPress={onSend} disabled={!value.trim()} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end'
  },
  input: {
    flex: 1
  },
  button: {
    minWidth: 88
  }
});
