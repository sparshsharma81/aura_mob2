import { Input } from '@/components/common/Input';

type SearchBarProps = Readonly<{
  value: string;
  onChangeText: (text: string) => void;
}>;

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return <Input value={value} onChangeText={onChangeText} placeholder="Search users" />;
}
