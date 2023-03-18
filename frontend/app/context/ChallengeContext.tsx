import { createContext, ReactNode, useState } from "react";
import { Challenge } from "types/challenge";

type Context = {
  challenges: Challenge[];
  modifyChallengeStatus: (challenge: Challenge) => void | (() => {});
  setChallenges: (challenges: Challenge[]) => void | (() => {});
  completeChallenge: (chalId: number) => void | (() => {});
  setChallengeActive: (challenge: Challenge) => void | (() => {});
  setChallengeInactive: (challenge: Challenge) => void | (() => {});
};

export const ChallengeContext = createContext<Context>({
  challenges: [],
  modifyChallengeStatus() {},
  setChallenges() {},
  completeChallenge() {},
  setChallengeActive() {},
  setChallengeInactive() {},
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

  const setChallengeActive = (challenge: Challenge) => {
    const index = challenges.findIndex((val) => val.id === challenge.id);
    setChallenges((prev) => {
      const chal = prev[index];
      chal.ip = challenge.ip;
      chal.secondsAvailable = challenge.secondsAvailable;
      chal.secondsLeft = challenge.secondsLeft;
      chal.status = challenge.status;
      prev[index] = chal;
      return [...prev];
    });
  };

  const setChallengeInactive = (challenge: Challenge) => {
    const index = challenges.findIndex((val) => val.id === challenge.id);
    setChallenges((prev) => {
      const chal = prev[index];
      delete chal.ip;
      delete chal.secondsAvailable;
      delete chal.secondsLeft;
      chal.status = challenge.status;
      prev[index] = chal;
      return [...prev];
    });
  };

  const completeChallenge = (chalId: number) => {
    const index = challenges.findIndex((val) => val.id === chalId);

    if (index < 0) {
      return;
    }

    setChallenges((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        setChallenges,
        modifyChallengeStatus,
        completeChallenge,
        setChallengeActive,
        setChallengeInactive,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
