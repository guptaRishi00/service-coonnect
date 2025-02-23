import { configureStore } from "@reduxjs/toolkit";
import UserAuthSlice from "../features/auth/UserAuthSlice";
import PostWorkSlice from "../features/auth/PostWorkSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthSlice,
    userWork: PostWorkSlice,
  },
});
