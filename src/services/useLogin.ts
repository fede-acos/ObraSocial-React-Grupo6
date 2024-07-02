import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

type loginDto = {
  username: string;
  password: string;
};
export const login = async (loginDto: loginDto) => {
  const { data } = await axios.post(
    "http://localhost:8080/auth/login",
    loginDto
  );
  return data;
};

export const useLogin = () => {
  const auth = useAuth();
  return useMutation({
    mutationFn: (loginDto: loginDto) => login(loginDto),
    onSuccess: (data) => {
      auth?.login(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
