"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./components/LoginForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/store/slices/userSlice";
import { setGameState } from "@/store/slices/gameSlice";

// Home component acting as the login/register page.
export default function Home() {
  const queryClient = new QueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  // State to track if the user is logged in.
  const [logged, setLogged] = useState(false);

  // Checks local storage for user data on component mount to handle session persistence.
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setLogged(true); // Set logged state to true if user data is found for loading phase.
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));
      dispatch(
        setGameState({
          gameBoard: userData.currentGame.board,
          winStatus: userData.currentGame.winStatus,
        })
      );
      // Redirect to the game page if user data is present.
      router.push("/game");
    }
  }, [dispatch, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col items-center my-auto">
        <div className="space-y-10 m-auto p-4 max-w-[600px] w-full">
          {logged && (
            <>
              <h1 className="text-center font-bold sm:text-2xl text-base">
                You Are Already Logged In
              </h1>
              <h1 className="text-center font-bold sm:text-2xl text-base">
                Redirecting You To The Game Page...
              </h1>
            </>
          )}
          <h1 className="text-center font-bold sm:text-4xl text-3xl">
            Start Playing Now!
          </h1>

          <div className="flex flex-col items-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
