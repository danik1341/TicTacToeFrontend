import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";

// Defines the root state type
export type RootState = {
  user: ReturnType<typeof userReducer>;
  game: ReturnType<typeof gameReducer>;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
