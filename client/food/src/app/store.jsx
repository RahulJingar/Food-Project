// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import usersReducer from "../features/users/usersSlice";
// import cartReducer from "../features/users/cartSlice";
// import chatReducer from "../features/users/chatSlice";

// const rootReducer = combineReducers({
//   users: usersReducer,
//   cart: cartReducer,
//   chat: chatReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart", "chat"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);


import { configureStore, combineReducers } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/users/cartSlice";
import chatReducer from "../features/users/chatSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  cart: cartReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
