import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (registerDto: RegisterDto) => register(registerDto),
    onSuccess: () => {
      toast.success("Usuario registrado con exito");
      navigate("/login");
    },
    onError: () => {
      toast.error("Error al registrar usuario");
    },
  });
};
