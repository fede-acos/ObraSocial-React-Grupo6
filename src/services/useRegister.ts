import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RegisterDto } from "../types/RegisterDto";

export const register = async (registerDto: RegisterDto) => {
  const { data } = await axios.post(
    "http://localhost:8080/auth/register",
    registerDto
  );
  return data;
};

export const useRegister = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (registerDto: RegisterDto) => register(registerDto),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
