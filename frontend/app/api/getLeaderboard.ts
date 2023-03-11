import axios from "axios";
import { Leaderboard } from "types/api/leaderboard";
import { LEADERBOARD } from "./endpoints";

export const getLeaderboard = async () => {
  return axios.get<Leaderboard>(LEADERBOARD);
};
