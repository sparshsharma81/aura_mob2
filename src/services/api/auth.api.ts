import { api } from './client';

export async function loginApi(payload: { email: string; password: string }) {
  const response = await api.post('/api/v1/user/login', payload);
  return response.data;
}

export async function registerApi(payload: { username: string; email: string; password: string }) {
  const response = await api.post('/api/v1/user/register', payload);
  return response.data;
}

export async function logoutApi() {
  const response = await api.get('/api/v1/user/logout');
  return response.data;
}
