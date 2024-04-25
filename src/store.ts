import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import appReducer from './store/appSlice'
import storage from "redux-persist/lib/storage";

const loggedInUserPersistConfig = {
  key: 'appData',
  storage,
}

const persistedLoggedInUserReducer = persistReducer(loggedInUserPersistConfig, appReducer);


const rootReducer = combineReducers({
  appData: persistedLoggedInUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;