import { api } from './client';

export async function fetchSuggestedUsersApi() {
  const response = await api.get('/api/v1/user/suggested');
  return response.data;
}

export async function fetchUserProfileApi(userId: string) {
  const response = await api.get(`/api/v1/user/${userId}/profile`);
  return response.data;
}

export async function searchUsersApi(query: string) {
  const response = await api.get(`/api/v1/user/search?query=${encodeURIComponent(query)}`);
  return response.data;
}

export async function followUserApi(userId: string) {
  const response = await api.post(`/api/v1/user/followorunfollow/${userId}`);
  return response.data;
}

export async function requestFollowApi(userId: string) {
  const response = await api.post(`/api/v1/user/request-follow/${userId}`);
  return response.data;
}

export async function cancelFollowRequestApi(userId: string) {
  const response = await api.post(`/api/v1/user/cancel-request/${userId}`);
  return response.data;
}

export async function editProfileApi(formData: FormData) {
  const response = await api.post('/api/v1/user/profile/edit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}
