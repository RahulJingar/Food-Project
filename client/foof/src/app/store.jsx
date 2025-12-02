// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../features/users/usersSlice";
// import cartReducer from "../features/users/cartSlice";

// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     cart: cartReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/users/cartSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  cart: cartReducer, // <- sirf is cart ko persist kar rahe
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // sirf cart slice persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
