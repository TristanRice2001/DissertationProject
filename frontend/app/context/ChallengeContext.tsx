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
  // First, set the initial challenges to an empty array. This will eventually be
  // set later in the application
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // This will modify a challenge. It will take a full challenge object as an argument,
  // and then find the matching challenge in the current challenges array. This will then
  // set the challenge at that index to the challenge given in the argument
  const modifyChallengeStatus = (challenge: Challenge) => {
    const index = challenges.findIndex((val) => val.id === challenge.id);
    setChallenges((prev) => {
      prev[index] = challenge;
      return [...prev];
    });
  };

  // All that this does is the same as the function on line 34, but will set additional
  // attributes, such as the IP address, secondsAvailable, and secondsLeft
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

  // This is the opposite function as the one on line 44, it will remove those additional
  // attributes that were added
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

  // Complete challenge will search for the challenge ID in the array, and if it exists,
  // will set the 'completed' attribute for that challenge to true
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
