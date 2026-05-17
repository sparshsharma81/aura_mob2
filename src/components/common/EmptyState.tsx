import { Text, View } from 'react-native';
import { Button } from './Button';

type EmptyStateProps = Readonly<{
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}>;

export function EmptyState({ title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={{ padding: 24, alignItems: 'center', gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>{title}</Text>
      {subtitle ? <Text style={{ color: '#64748b', textAlign: 'center' }}>{subtitle}</Text> : null}
      {actionLabel ? <Button title={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}
