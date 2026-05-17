import { Button } from '@/components/common/Button';

type FollowButtonProps = Readonly<{
  following: boolean;
  onPress?: () => void;
}>;

export function FollowButton({ following, onPress }: FollowButtonProps) {
  return <Button title={following ? 'Following' : 'Follow'} variant={following ? 'secondary' : 'primary'} onPress={onPress} />;
}
