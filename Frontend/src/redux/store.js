import { configureStore } from "@reduxjs/toolkit";
import UserAuthSlice from "../features/auth/UserAuthSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthSlice,
  },
});
