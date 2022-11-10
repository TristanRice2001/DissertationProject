import axios from "axios";
import { AuthResponse } from "types/api/auth";
import { LoginForm } from "types/forms/login";
import { LOGIN } from "./endpoints";

export const login = ({ username, password }: LoginForm) => {
  return axios.post<AuthResponse>(LOGIN, {
    username,
    password,
  });
};
