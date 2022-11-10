import { Challenge } from "types/challenge";
import { authenticatedRequest } from "./authenticatedRequest";
import { CHALLENGES } from "./endpoints";

export const getChallenges = async (jwtToken: string) => {
  return authenticatedRequest(jwtToken).get<Challenge[]>(CHALLENGES);
};
