import { GenericResponse } from "types/api/generic";
import { authenticatedRequest } from "./authenticatedRequest";
import { SUBMIT_FLAG } from "./endpoints";

export const submitFlag = async (
  jwtToken: string,
  chal_id: number,
  flag: string
) => {
  return authenticatedRequest(jwtToken).post<GenericResponse>(
    SUBMIT_FLAG(chal_id),
    {
      flag,
    }
  );
};
