"use client";

import { setGameState } from "@/store/slices/gameSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import GameBoardComponent from "../components/GameBoard";

// Predefined difficulties for the game.
const difficulties = ["Easy", "Medium", "Hard"];

export default function GameBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const game = useSelector((state: RootState) => state.game);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [logged, setLogged] = useState(false);

  // Check for user data in local storage on component mount to persist user session.
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setLogged(false);
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData)); // Update user state and game state with cached data.
      dispatch(
        setGameState({
          gameBoard: userData.currentGame.board,
          winStatus: userData.currentGame.winStatus,
        })
      );
      setLogged(true); // Indicate that loading is complete and user data is available.
    } else {
      router.push("/"); // Redirect to login if no cached user data is found.
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (user && game) {
      setLogged(true);
    }
  }, [user, game]);

  // Update state based on game outcome, trigger data refresh from the server.
  useEffect(() => {
    if (game.winStatus) {
      const refreshDataAfterEndGame = async () => {
        const email = user.email;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          { email }
        );

        if (response.data) {
          dispatch(setUser(response.data)); // Update user state with fresh data.
        }
      };
      refreshDataAfterEndGame();
    }
  }, [dispatch, game.winStatus, user.email]);

  // Handler for difficulty selection
  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  // Handler for game board spot clicks.
  const handleSpotClick = async (index: number) => {
    // Calculate row and column from index.
    const row = Math.floor(index / 3);
    const column = index % 3;

    const gameData = { row, column };
    const userEmail = user.email;
    const optimisticUpdate = [...game.gameBoard];
    dispatch(setGameState({ ...game, gameBoard: optimisticUpdate }));
    const difficulty = selectedDifficulty.toLowerCase();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/game/play?difficulty=${difficulty}`,
        gameData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userEmail}`,
          },
        }
      );
      // dispatch(setGameState(response.data));
      if (response.data && response.data.gameBoard) {
        dispatch(setGameState(response.data)); // Update game state with response data.
      } else {
        console.error("Received unexpected game state:", response.data);
      }
    } catch (error) {
      console.error("Error playing move:", error);
    }
  };

  return (
    <div className="h-screen my-auto overflow-hidden">
      <div className="">
        <Navbar />
      </div>
      <div className="w-full h-full max-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8">Tic Tac Toe</h1>
        {logged ? (
          <GameBoardComponent game={game} handleSpotClick={handleSpotClick} />
        ) : (
          <div className="bg-slate-300 rounded-lg shadow w-[300px] h-[300px] flex items-center justify-center">
            <CircularProgress size={100} />
          </div>
        )}

        {game.winStatus && (
          <div className="flex flex-col items-center space-y-2 mt-6 font-bold text-base sm:text-xl">
            {game.winStatus === "X" ? (
              <>
                <span>You Won! Great Job</span>
                <span>Click On The Board To Play Your Next Game</span>
              </>
            ) : game.winStatus === "O" ? (
              <>
                <span>You Lost! Try Your Best Next Time!</span>
                <span>Click On The Board To Play Your Next Game</span>
              </>
            ) : (
              <>
                <span>It Is A Draw!</span>
                <span>Click On The Board To Play Your Next Game</span>
              </>
            )}
          </div>
        )}

        <div className="w-[90%] sm:w-1/2 flex space-x-3 justify-evenly bg-slate-400 mt-10 rounded border-solid border-[thin] border-gray-500">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleDifficultySelect(difficulty)}
              className={`rounded w-full text-2xl transition-colors duration-500 p-3 ${
                selectedDifficulty === difficulty
                  ? "bg-sky-600 text-white"
                  : "bg-sky-300 hover:bg-sky-600 hover:text-white"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
