import { api } from './client';

export async function fetchMessagesApi(userId: string) {
  const response = await api.get(`/api/v1/message/all/${userId}`);
  return response.data;
}

export async function sendMessageApi(userId: string, textMessage: string) {
  const response = await api.post(`/api/v1/message/send/${userId}`, { textMessage });
  return response.data;
}
