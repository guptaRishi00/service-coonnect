import { configureStore } from "@reduxjs/toolkit";
import UserAuthSlice from "../features/auth/UserAuthSlice";
import PostWorkSlice from "../features/auth/PostWorkSlice";
import MessageSlice from "../features/message/messageSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthSlice,
    userWork: PostWorkSlice,
    message: MessageSlice,
  },
});
