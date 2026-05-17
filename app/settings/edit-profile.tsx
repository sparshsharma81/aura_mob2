import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { editProfileApi } from '@/services/api/users.api';
import { setAuthUser } from '@/features/auth/authSlice';

export default function EditProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [bio, setBio] = useState(user?.bio || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [isPrivate, setIsPrivate] = useState(Boolean(user?.isPrivate));
  const [image, setImage] = useState<string | null>(null);

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('gender', gender);
    formData.append('isPrivate', String(isPrivate));

    if (image) {
      const filename = image.split('/').pop() || 'profile.jpg';
      const match = /\.(\w+)$/.exec(filename);
      // @ts-expect-error React Native file upload shape
      formData.append('profilePhoto', { uri: image, name: filename, type: match ? `image/${match[1]}` : 'image/jpeg' });
    }

    const data = await editProfileApi(formData);
    if (data?.success && data?.user) {
      dispatch(setAuthUser(data.user));
      router.back();
    }
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Edit profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={chooseImage} style={styles.imageButton}>
          {image ? <Image source={{ uri: image }} style={styles.avatar} /> : <Text style={styles.imageLabel}>Choose profile photo</Text>}
        </Pressable>
        <Input value={bio} onChangeText={setBio} placeholder="Bio" />
        <Input value={gender} onChangeText={setGender} placeholder="Gender" />
        <View style={styles.row}>
          <Text style={styles.label}>Private account</Text>
          <Switch value={isPrivate} onValueChange={setIsPrivate} />
        </View>
        <Button title="Save changes" onPress={submit} />
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
    height: 120,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageLabel: {
    color: '#475569',
    fontWeight: '700'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: '#0f172a',
    fontWeight: '600'
  }
});
