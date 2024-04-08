import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from './store/userSlice'
import { persistStore, persistReducer } from 'redux-persist';
import plantReducer from './store/plantSlice'
import storage from "redux-persist/lib/storage";

const loggedInUserPersistConfig = {
  key: 'loggedInUser',
  storage,
}

const persistedLoggedInUserReducer = persistReducer(loggedInUserPersistConfig, usersReducer);


const rootReducer = combineReducers({
  users: persistedLoggedInUserReducer,
  plants: plantReducer,
});

export const store = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;