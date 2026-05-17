import { api } from './client';

export async function fetchPostsApi() {
  const response = await api.get('/api/v1/post/all');
  return response.data;
}

export async function createPostApi(payload: { caption: string; image: { uri: string; name: string; type: string } }) {
  const formData = new FormData();
  formData.append('caption', payload.caption);
  // @ts-expect-error FormData file upload shape is supported by React Native.
  formData.append('image', payload.image);
  const response = await api.post('/api/v1/post/addpost', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export async function likePostApi(postId: string) {
  const response = await api.get(`/api/v1/post/${postId}/like`);
  return response.data;
}

export async function dislikePostApi(postId: string) {
  const response = await api.get(`/api/v1/post/${postId}/dislike`);
  return response.data;
}

export async function addCommentApi(postId: string, text: string) {
  const response = await api.post(`/api/v1/post/${postId}/comment`, { text });
  return response.data;
}

export async function fetchCommentsApi(postId: string) {
  const response = await api.post(`/api/v1/post/${postId}/comment/all`);
  return response.data;
}
