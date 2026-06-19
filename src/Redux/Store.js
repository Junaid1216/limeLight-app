import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from './Slices/AuthSlice';
import RoleSlice from './Slices/RoleSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['AUTH', 'ROLE'],
};

const rootReducer = combineReducers({
  AUTH: AuthSlice,
  ROLE: RoleSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
