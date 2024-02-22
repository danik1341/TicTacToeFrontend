import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetUserState, setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { resetGameState } from "@/store/slices/gameSlice";

// Defines a navigation bar displayed at the top of the game page.
const Navbar = () => {
  // Retrieves user information from the Redux store.
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // On component mount, checks for user data in local storage to maintain session persistence.
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Dispatches an action to update the user state with stored data, if available.
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  // Handles the logout process.
  const handleLogout = () => {
    // Clears user data from local storage.
    localStorage.removeItem("userData");

    // Resets game and user states to their initial states.
    dispatch(resetGameState());
    dispatch(resetUserState());

    // Redirects to the login page.
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="flex flex-col sm:flex-row flex-grow">
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
              className="text-base sm:text-xl"
            >
              {user.email}
            </Typography>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
              className="text-base sm:text-xl"
            >
              Games: {user.games} | Wins: {user.wins} | Losses: {user.losses}
            </Typography>
          </div>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
