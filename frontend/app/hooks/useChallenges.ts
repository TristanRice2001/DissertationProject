import { ChallengeContext } from "context/ChallengeContext";
import { useContext } from "react";

export const useChallenges = () => {
  return useContext(ChallengeContext);
};
