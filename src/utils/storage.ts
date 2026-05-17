import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredValue(key: string) {
  return AsyncStorage.getItem(key);
}

export async function setStoredValue(key: string, value: string) {
  return AsyncStorage.setItem(key, value);
}

export async function removeStoredValue(key: string) {
  return AsyncStorage.removeItem(key);
}
