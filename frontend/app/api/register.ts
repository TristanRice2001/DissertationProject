import axios from "axios";
import { RegisterResponse } from "types/api/register";
import { REGISTER } from "./endpoints";

export const register = (username: string, password: string) => {
  return axios.post<RegisterResponse>(REGISTER, {
    username,
    password,
  });
};
