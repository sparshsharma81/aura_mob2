import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist';

export const persistStorage = AsyncStorage;

export function createPersistedReducer<T>(config: PersistConfig<T>, reducer: any) {
  return persistReducer(config, reducer);
}

export { persistStore };
