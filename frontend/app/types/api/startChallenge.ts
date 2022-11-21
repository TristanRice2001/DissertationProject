import { Challenge } from "types/challenge";
import { GenericResponse } from "./generic";

export interface StartChallengeResponse extends GenericResponse {
  challenge?: Challenge;
}
