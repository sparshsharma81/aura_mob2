import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { rootReducer } from './rootReducer';
import { persistStorage, persistStore as createPersistor } from './persist';

const persistConfig = {
  key: 'root',
  storage: persistStorage,
  blacklist: ['socketio']
};

const persistedReducer = persistReducer(persistConfig as any, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = createPersistor(store as any);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
