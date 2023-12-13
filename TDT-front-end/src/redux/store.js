import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import settingsReducer from "./settings";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware:  getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
