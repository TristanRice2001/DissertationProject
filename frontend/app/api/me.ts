import axios from "axios";
import { MeResponse } from "types/api/me";
import { ME } from "./endpoints";

export const me = () => {
  return axios.get<MeResponse>(ME);
};
