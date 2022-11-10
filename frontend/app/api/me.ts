import axios from "axios";
import { MeResponse } from "types/api/me";
import { authenticatedRequest } from "./authenticatedRequest";
import { ME } from "./endpoints";

export const me = (jwtToken: string) => {
  return authenticatedRequest(jwtToken).get<MeResponse>(ME);
};
