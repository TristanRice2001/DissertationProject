import { StartChallengeResponse } from "types/api/startChallenge";
import { authenticatedRequest } from "./authenticatedRequest";
import { START_CHALLENGE } from "./endpoints";

export const startChallenge = async (jwtToken: string, chalId: number) => {
  return authenticatedRequest(jwtToken).get<StartChallengeResponse>(
    START_CHALLENGE(chalId)
  );
};
