import { startChallenge } from "api/startChallenge";
import { terminateChallenge } from "api/terminateChallenge";
import appConstants from "appConstants";
import Challenge from "components/Challenge";
import HintsModal from "components/HintsModal";
import SubmitModal from "components/SubmitModal";
import { getJwtToken } from "helpers";
import { useChallenges } from "hooks/useChallenges";
import { useToggle } from "hooks/useToggle";
import { useState, useReducer } from "react";
import DashboardStlyed from "./DashboardStyled";

type LoadingQueryAction = {
  type: "add_loading_chal" | "remove_loading_chal";
  chalId: number;
};

const loadingQueries = (state: number[], action: LoadingQueryAction) => {
  // Replace this with react-query soon
  if (action.type == "add_loading_chal") {
    return [...state, action.chalId];
  } else if (action.type == "remove_loading_chal") {
    const chalIdIndex = state.indexOf(action.chalId);
    if (chalIdIndex < 0) {
      return state;
    }
    state.splice(chalIdIndex, 1);
    return state;
  }
};

const Dashboard = () => {
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedHints, setSelectedHints] = useState<string[]>([]);
  const [selectedChallengeSubmit, setSelectedChallengeSubmit] = useState<
    number | null
  >(null);
  const { challenges, modifyChallengeStatus } = useChallenges();

  const handleHintsModalClose = () => {
    setIsHintsModalOpen(false);
  };

  const handleSubmitModalOpen = (chalId: number) => {
    setIsSubmitModalOpen(true);
    setSelectedChallengeSubmit(chalId);
  };

  const handleSubmitModalClsoe = () => {
    setIsSubmitModalOpen(false);
  };

  const handleHint = (hints: string[]) => {
    setSelectedHints(hints);
    setIsHintsModalOpen(true);
  };

  const handleError = (message = "") => {
    console.log("Error occured!");
  };

  const handleStart = async (chalId: number) => {
    setIsStartLoading(true);

    const authToken = getJwtToken();
    if (!authToken) return;

    let res;

    try {
      res = await startChallenge(authToken, chalId);
      setIsStartLoading(false);
    } catch (e) {
      setIsStartLoading(false);
      handleError();
      return;
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
            isStartLoading={isStartLoading}
            onTermination={handleTermination}
            onStart={handleStart}
            key={chal.id}
            challenge={chal}
            onSubmitFlag={handleSubmitModalOpen}
            onHint={handleHint}
          />
        ))}
      </div>
      <HintsModal
        onClose={handleHintsModalClose}
        isOpen={isHintsModalOpen}
        hints={selectedHints}
      />
      {isSubmitModalOpen && selectedChallengeSubmit && (
        <SubmitModal
          onClose={handleSubmitModalClsoe}
          isOpen={isSubmitModalOpen}
          chalId={selectedChallengeSubmit}
        />
      )}
    </DashboardStlyed>
  );
};

export default Dashboard;
