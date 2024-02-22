import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  gameBoard: string[];
  winStatus: "X" | "O" | "";
}

const initialState: GameState = {
  gameBoard: Array(9).fill(null),
  winStatus: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameBoard = action.payload.gameBoard;
      state.winStatus = action.payload.winStatus;
    },
    resetGame: (state) => {
      state.gameBoard = Array(9).fill(null);
      state.winStatus = "";
    },
    resetGameState: () => initialState,
  },
});

export const { setGameState, resetGame, resetGameState } = gameSlice.actions;
export default gameSlice.reducer;
