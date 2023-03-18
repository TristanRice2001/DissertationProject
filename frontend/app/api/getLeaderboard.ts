import axios from "axios";
import { Leaderboard } from "types/api/leaderboard";
import { authenticatedRequest } from "./authenticatedRequest";
import { LEADERBOARD } from "./endpoints";

export const getLeaderboard = async (authenticationToken?: string) => {
  if (authenticationToken) {
    return authenticatedRequest(authenticationToken).get<Leaderboard>(
      LEADERBOARD
    );
  }
  return axios.get<Leaderboard>(LEADERBOARD);
};
