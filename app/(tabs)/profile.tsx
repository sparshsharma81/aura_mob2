import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFeed } from '@/hooks/useFeed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAuthUser } from '@/features/auth/authSlice';
import { logoutApi } from '@/services/api/auth.api';
import { ExploreGrid } from '@/components/explore/ExploreGrid';

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { userProfile, loading } = useUserProfile(user?._id);
  const { posts } = useFeed();

  const profile = userProfile || user;
  const myPosts = useMemo(() => posts.filter((post) => String(post.author?._id) === String(profile?._id)), [posts, profile?._id]);

  const logout = async () => {
    await logoutApi();
    dispatch(setAuthUser(null));
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Profile"
        right={<Button title="Edit" variant="secondary" onPress={() => router.push('/settings/edit-profile')} />}
      />
      {loading || !profile ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <ProfileHeader user={profile} />
          <ProfileStats posts={myPosts.length} followers={profile.followers?.length || 0} following={profile.following?.length || 0} />
          <View style={styles.actions}>
            <Button title="Edit profile" onPress={() => router.push('/settings/edit-profile')} />
            <Button title="Logout" variant="secondary" onPress={logout} />
          </View>
          {myPosts.length ? <ExploreGrid posts={myPosts} onPressPost={(post) => router.push(`/post/${post._id}`)} /> : <EmptyState title="No posts yet" subtitle="Create your first Aura post from the create screen." actionLabel="Create post" onAction={() => router.push('/post/create')} />}
        </ScrollView>
      )}
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
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16
  }
});
