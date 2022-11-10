import { GenericResponse } from "types/api/generic";
import { authenticatedRequest } from "./authenticatedRequest";
import { START_CHALLENGE } from "./endpoints";

export const startChallenge = async (jwtToken: string, chalId: number) => {
  return authenticatedRequest(jwtToken).get<GenericResponse>(
    START_CHALLENGE(chalId)
  );
};
