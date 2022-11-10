import axios from "axios";
import { AuthResponse } from "types/api/auth";
import { RegisterForm } from "types/forms/register";
import { REGISTER } from "./endpoints";

export const register = ({ username, password }: RegisterForm) => {
  return axios.post<AuthResponse>(REGISTER, {
    username,
    password,
  });
};
