import { startChallenge } from "api/startChallenge";
import constants from "appConstants";
import Challenge from "components/Challenge";
import HintsModal from "components/HintsModal";
import { getCookie } from "helpers/cookie";
import { useState } from "react";
import { Challenge as ChallengeType } from "types/challenge";
import DashboardStlyed from "./DashboardStyled";

interface Props {
  challenges: ChallengeType[];
}

const Dashboard = ({ challenges }: Props) => {
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false);
  const [selectedHints, setSelectedHints] = useState<string[]>([]);

  const handleClose = () => {
    setIsHintsModalOpen(false);
  };

  const handleHint = (hints: string[]) => {
    setSelectedHints(hints);
    setIsHintsModalOpen(true);
  };

  const handleStart = async (chalId: number) => {
    const authTokenCookieName = constants["AUTH_TOKEN_COOKIE_NAME"];
    const authToken = getCookie(authTokenCookieName);
    if (!authToken) return;

    try {
      const res = await startChallenge(authToken, chalId);
      console.log(res.data);
    } catch {
      console.log("Here");
    }
  };

  return (
    <DashboardStlyed>
      <div className="challenge-container">
        {challenges.map((chal) => (
          <Challenge
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
