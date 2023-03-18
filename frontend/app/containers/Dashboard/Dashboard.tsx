import { startChallenge } from "api/startChallenge";
import { terminateChallenge } from "api/terminateChallenge";
import appConstants from "appConstants";
import Challenge from "components/Challenge";
import ChallengeFilters from "components/ChallengeFilters/ChallengeFilters";
import HintsModal from "components/HintsModal";
import SubmitModal from "components/SubmitModal";
import Title from "components/Title/Title";
import { FilterContextProvider } from "context/FilterContext";
import { getJwtToken } from "helpers";
import { useChallenges } from "hooks/useChallenges";
import useLoading from "hooks/useLoading";
import { useState } from "react";
import { useFilteredChallenges } from "hooks/useFilteredChallenges";
import { toast } from "react-toastify";
import DashboardStlyed from "./DashboardStyled";
import { useFilters } from "hooks/useFilters";

const Dashboard = () => {
  const {
    isItemLoading: isChallengeStartLoading,
    setItemLoading: setIsChallengeStartLoading,
  } = useLoading();
  const {
    isItemLoading: isChallengeStopLoading,
    setItemLoading: setIsChallengeStopLoading,
  } = useLoading();
  const [isHintsModalOpen, setIsHintsModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedHints, setSelectedHints] = useState<string[]>([]);
  const [selectedChallengeSubmit, setSelectedChallengeSubmit] = useState<
    number | null
  >(null);
  const { setChallengeInactive, setChallengeActive } = useChallenges();
  const { viewType } = useFilters();
  const { filteredChallenges } = useFilteredChallenges();

  const dashboardContainerClass = viewType === "GRID" ? "grid" : "list";

  const handleHintsModalClose = () => {
    setIsHintsModalOpen(false);
  };

  const handleSubmitModalOpen = (chalId: number) => {
    setIsSubmitModalOpen(true);
    setSelectedChallengeSubmit(chalId);
  };

  const handleSubmitModalClose = () => {
    setIsSubmitModalOpen(false);
  };

  const handleHint = (hints: string[]) => {
    setSelectedHints(hints);
    setIsHintsModalOpen(true);
  };

  const handleError = (message = "") => {
    toast.error(message || "Error occured");
  };

  const handleSuccess = (message = "") => {
    toast.success(message || "Success!");
  };

  const handleStart = async (chalId: number) => {
    setIsChallengeStartLoading(chalId, true);

    const authToken = getJwtToken();
    if (!authToken) return;

    let res;

    try {
      res = await startChallenge(authToken, chalId);
      setIsChallengeStartLoading(chalId, false);
    } catch (e) {
      setIsChallengeStartLoading(chalId, false);
      handleError();
      return;
    }

    if (!res || !res?.data.success || !res?.data.challenge) {
      handleError(res.data.message || "Error occured");
      return;
    }

    setChallengeActive(res.data.challenge);
    handleSuccess("Challenge started successfully!");
  };

  const handleTermination = async (chalId: number) => {
    const authToken = getJwtToken();
    setIsChallengeStopLoading(chalId, true);

    if (!authToken) return;

    let res;

    try {
      res = await terminateChallenge(authToken, chalId);
      setIsChallengeStopLoading(chalId, false);
    } catch (e) {
      handleError(appConstants["GENERIC_API_ERROR"]);
      setIsChallengeStopLoading(chalId, false);
    }

    if (!res || !res?.data.success || !res?.data.challenge) {
      handleError(res?.data.message);
      return;
    }

    setChallengeInactive(res.data.challenge);
    handleSuccess("Challenge stopped successfully!");
  };

  return (
    <DashboardStlyed>
      <Title>Dashboard</Title>
      <div className={`challenge-container ${dashboardContainerClass}`}>
        <ChallengeFilters />
        {filteredChallenges.map(({ challenge: chal, isHidden }) => (
          <Challenge
            isTerminateLoading={isChallengeStopLoading(chal.id)}
            isStartLoading={isChallengeStartLoading(chal.id)}
            onTermination={handleTermination}
            onStart={handleStart}
            key={chal.id}
            challenge={chal}
            onSubmitFlag={handleSubmitModalOpen}
            onHint={handleHint}
            isHidden={isHidden}
          />
        ))}
      </div>
      {isHintsModalOpen && (
        <HintsModal
          onClose={handleHintsModalClose}
          isOpen={isHintsModalOpen}
          hints={selectedHints}
        />
      )}
      {isSubmitModalOpen && selectedChallengeSubmit && (
        <SubmitModal
          onClose={handleSubmitModalClose}
          isOpen={isSubmitModalOpen}
          chalId={selectedChallengeSubmit}
        />
      )}
    </DashboardStlyed>
  );
};

export default Dashboard;
