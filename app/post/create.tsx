import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { createPostApi } from '@/services/api/posts.api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPosts } from '@/features/posts/postSlice';

export default function CreatePostScreen() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = async () => {
    if (!image) return;
    const filename = image.split('/').pop() || 'post.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const response = await createPostApi({
      caption,
      // @ts-expect-error React Native file upload shape
      image: { uri: image, name: filename, type: match ? `image/${match[1]}` : 'image/jpeg' }
    });

    if (response?.success && response?.post) {
      dispatch(setPosts([response.post, ...posts]));
      router.back();
    }
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Create post" />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={chooseImage} style={styles.imageButton}>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.imageLabel}>Choose a photo</Text>}
        </Pressable>
        <Input value={caption} onChangeText={setCaption} placeholder="Write a caption" />
        <Button title="Publish" onPress={submit} disabled={!image} />
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
    gap: 14
  },
  imageButton: {
    height: 260,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageLabel: {
    color: '#475569',
    fontWeight: '700'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  }
});
