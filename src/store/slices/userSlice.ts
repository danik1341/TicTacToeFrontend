import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  games: number;
  wins: number;
  losses: number;
}

const initialState: UserState = {
  email: "",
  games: 0,
  wins: 0,
  losses: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.games = action.payload.games;
      state.wins = action.payload.wins;
      state.losses = action.payload.losses;
    },
    resetUserState: () => initialState,
  },
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
