import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { FollowButton } from '@/components/profile/FollowButton';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFeed } from '@/hooks/useFeed';
import { followUserApi } from '@/services/api/users.api';
import { ExploreGrid } from '@/components/explore/ExploreGrid';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userProfile, loading } = useUserProfile(id);
  const { posts } = useFeed();

  const profile = userProfile;
  const profilePosts = posts.filter((post) => String(post.author?._id) === String(id));

  if (loading || !profile) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Profile" />
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title={profile.username} />
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader user={profile} />
        <ProfileStats posts={profilePosts.length} followers={profile.followers?.length || 0} following={profile.following?.length || 0} />
        <View style={styles.actions}>
          <FollowButton following={Boolean(profile.followers?.includes(String(id || '')))} onPress={async () => followUserApi(profile._id)} />
        </View>
        <View style={styles.actions}>
          <FollowButton following={true} onPress={() => router.push(`/chat/${profile._id}`)} />
        </View>
        {profilePosts.length ? <ExploreGrid posts={profilePosts} onPressPost={(post) => router.push(`/post/${post._id}`)} /> : <EmptyState title="No posts yet" subtitle="This user has not shared anything yet." />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  content: {
    paddingBottom: 24
  },
  actions: {
    paddingHorizontal: 16,
    marginBottom: 12
  }
});
