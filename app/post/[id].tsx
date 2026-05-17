import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedPost } from '@/features/posts/postSlice';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { CommentSheet } from '@/components/post/CommentSheet';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { addCommentApi, dislikePostApi, fetchCommentsApi, likePostApi } from '@/services/api/posts.api';
import { usePost } from '@/hooks/usePost';
import { Image } from 'react-native';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post.posts.find((item) => item._id === id)) || useAppSelector((state) => state.post.selectedPost);
  const { comments, setComments } = usePost(id);
  const [busy, setBusy] = useState(false);

  const like = async () => {
    if (!id) return;
    setBusy(true);
    await likePostApi(id);
    setBusy(false);
  };

  const comment = async (text: string) => {
    if (!id || !text.trim()) return;
    await addCommentApi(id, text);
    const data = await fetchCommentsApi(id);
    setComments(data.comments || []);
  };

  const likeCount = post?.likes?.length || 0;

  if (!post) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Post" />
        <Text style={styles.missing}>Post not found. Go back to home and reopen it.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Post" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Avatar uri={post.author?.profilePicture} name={post.author?.username} size={42} />
            <View style={{ flex: 1 }}>
              <Text style={styles.username}>{post.author?.username}</Text>
              <Text style={styles.caption}>{post.caption}</Text>
            </View>
          </View>
          <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.actions}>
            <Button title={`Like (${likeCount})`} variant="secondary" onPress={like} disabled={busy} />
            <Button title="Back" onPress={() => router.back()} />
          </View>
        </View>
        <CommentSheet comments={comments} onSubmit={comment} />
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
    padding: 16,
    gap: 16,
    paddingBottom: 28
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 16
  },
  username: {
    fontWeight: '800',
    color: '#0f172a'
  },
  caption: {
    color: '#334155',
    marginTop: 2
  },
  image: {
    width: '100%',
    height: 360,
    backgroundColor: '#e2e8f0'
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16
  },
  missing: {
    padding: 16,
    color: '#475569'
  }
});
