import { startChallenge } from "api/startChallenge";
import { terminateChallenge } from "api/terminateChallenge";
import appConstants from "appConstants";
import Challenge from "components/Challenge";
import HintsModal from "components/HintsModal";
import { getJwtToken } from "helpers";
import { useChallenges } from "hooks/useChallenges";
import { useState } from "react";
import DashboardStlyed from "./DashboardStyled";

const Dashboard = () => {
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false);
  const [selectedHints, setSelectedHints] = useState<string[]>([]);
  const { challenges, modifyChallengeStatus } = useChallenges();

  const handleClose = () => {
    setIsHintsModalOpen(false);
  };

  const handleHint = (hints: string[]) => {
    setSelectedHints(hints);
    setIsHintsModalOpen(true);
  };

  const handleError = (message = "") => {
    console.log("Error occured!");
  };

  const handleStart = async (chalId: number) => {
    const authToken = getJwtToken();
    if (!authToken) return;

    let res;

    try {
      res = await startChallenge(authToken, chalId);
    } catch (e) {
      handleError();
    }

    if (!res || !res?.data.success || !res?.data.challenge) {
      handleError();
      return;
    }

    modifyChallengeStatus(res.data.challenge);
  };

  const handleTermination = async (chalId: number) => {
    const authToken = getJwtToken();
    if (!authToken) return;

    let res;

    try {
      res = await terminateChallenge(authToken, chalId);
    } catch (e) {
      handleError(appConstants["GENERIC_API_ERROR"]);
    }

    if (!res || !res?.data.success || !res?.data.challenge) {
      handleError(res?.data.message);
      return;
    }

    modifyChallengeStatus(res.data.challenge);
  };

  return (
    <DashboardStlyed>
      <div className="challenge-container">
        {challenges.map((chal) => (
          <Challenge
            onTermination={handleTermination}
            onStart={handleStart}
            key={chal.id}
            challenge={chal}
            onHint={handleHint}
          />
        ))}
      </div>
      <HintsModal
        onClose={handleClose}
        isOpen={isHintsModalOpen}
        hints={selectedHints}
      />
    </DashboardStlyed>
  );
};

export default Dashboard;
