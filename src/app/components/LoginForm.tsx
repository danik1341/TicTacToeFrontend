"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setGameState } from "@/store/slices/gameSlice";

// Schema for email validation using Joi.
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

// LoginForm component for handling user login and registration.
const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  // useForm hook for form validation.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  // useMutation hook to handle login/register API request.
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      // API call to login/register endpoint.
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        { email }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // On successful response, update Redux store and local storage with user data.
      // Navigate to the game page.
      dispatch(
        setGameState({
          gameBoard: data.currentGame.board,
          winStatus: data.currentGame.winStatus,
        })
      );
      dispatch(setUser(data));
      localStorage.setItem("userData", JSON.stringify(data));
      router.push("/game");
    },
    // Optionally, handle errors
    onError: (error: any) => {
      // Handle errors by setting an error message state.
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong, please try again.");
    },
  });

  // Form submission handler.
  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data.email);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit as any)}
      sx={{
        "& .MuiTextField-root": { m: 1 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="sm:w-3/4 border-solid border-[thin] border-gray-600 sm:p-10 p-6 rounded"
    >
      <TextField
        {...register("email")}
        error={Boolean(errors.email)}
        helperText={(errors.email?.message as string) || ""}
        required
        id="email"
        label="Email"
        type="email"
        className="sm:w-3/4"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        className="bg-blue-500 sm:w-1/2 hover:transition-all hover:translate-y-[-1px] delay-200"
      >
        Login / Register
      </Button>
      {errorMessage && (
        <Box color="error.main" mt={2}>
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
