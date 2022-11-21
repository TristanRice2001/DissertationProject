import { StartChallengeResponse } from "types/api/startChallenge";
import { authenticatedRequest } from "./authenticatedRequest";
import { TERMINATE_CHALLENGE } from "./endpoints";

export const terminateChallenge = async (jwtToken: string, chalId: number) => {
  return authenticatedRequest(jwtToken).get<StartChallengeResponse>(
    TERMINATE_CHALLENGE(chalId)
  );
};
