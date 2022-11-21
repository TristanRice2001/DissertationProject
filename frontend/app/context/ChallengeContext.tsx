import { createContext, ReactNode, useState } from "react";
import { Challenge } from "types/challenge";

type Context = {
  challenges: Challenge[];
  modifyChallengeStatus: (challenge: Challenge) => void | (() => {});
  setChallenges: (challenges: Challenge[]) => void | (() => {});
};

export const ChallengeContext = createContext<Context>({
  challenges: [],
  modifyChallengeStatus() {},
  setChallenges() {},
});

interface Props {
  children: ReactNode;
}

export const ChallengeContextProvider = ({ children }: Props) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const modifyChallengeStatus = (challenge: Challenge) => {
    const index = challenges.findIndex((val) => val.id === challenge.id);
    setChallenges((prev) => {
      prev[index] = challenge;
      return [...prev];
    });
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        setChallenges,
        modifyChallengeStatus,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
