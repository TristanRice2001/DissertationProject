import ActionButton from "components/ActionButton";
import ChallengePoints from "components/ChallengePoints";
import ChallengeProgressBar from "components/ChallengeProgressBar";
import ChallengeStatus from "components/ChallengeStatus";
import ChallengeTitle from "components/ChallengeTitle";
import { useFilters } from "hooks/useFilters";
import { Challenge as ChallengeType } from "types/challenge";
import ChallengeStyled from "./ChallengeStyled";

interface Props {
  challenge: ChallengeType;
  isStartLoading: boolean;
  isTerminateLoading: boolean;
  onStart: (chalId: number) => void;
  onHint: (hints: string[]) => void;
  onSubmitFlag: (chalId: number) => void;
  onTermination: (chalId: number) => void;
  isHidden: boolean;
}

const Challenge = ({
  challenge,
  isStartLoading,
  onHint,
  isTerminateLoading,
  onStart,
  onTermination,
  onSubmitFlag,
  isHidden,
}: Props) => {
  const { viewType } = useFilters();

  const isChallengeActive = challenge.status === "active";
  const isGrid = viewType === "GRID";

  const challengeClass = isGrid ? "grid" : "list";

  const handleHintClick = () => {
    onHint(challenge.hints);
  };

  const handleStartClick = () => {
    onStart(challenge.id);
  };

  const handleTerminationClick = () => {
    onTermination(challenge.id);
  };

  const handleSubmitFlagClick = () => {
    onSubmitFlag(challenge.id);
  };

  return (
    <ChallengeStyled
      className={challengeClass}
      style={{
        display: isHidden
          ? "none"
          : "grid" /* used stlye prop here for efficiency */,
      }}
    >
      <ChallengePoints className="challenge-points" points={challenge.points} />
      <ChallengeTitle
        className="challenge-name"
        name={challenge.name}
        isCompleted={challenge.completed}
      />
      <div className="challenge-buttons">
        <ActionButton
          variant="start"
          isIcon={isGrid}
          isLoading={isStartLoading}
          isDisabled={isChallengeActive}
          onClick={handleStartClick}
        />
        <ActionButton
          variant="stop"
          isIcon={isGrid}
          onClick={handleTerminationClick}
          isLoading={isTerminateLoading}
          isDisabled={!isChallengeActive}
        />
        <ActionButton
          isIcon={isGrid}
          variant="hint"
          onClick={handleHintClick}
        />
        <ActionButton
          isIcon={isGrid}
          variant="submit"
          onClick={handleSubmitFlagClick}
        />
      </div>
      {isChallengeActive &&
        challenge.secondsLeft &&
        challenge.secondsAvailable && (
          <ChallengeProgressBar
            className="challenge-progress-bar"
            totalSecondsForChallenge={challenge.secondsAvailable}
            totalSecondsLeftForChallenge={challenge.secondsLeft}
          />
        )}
      <ChallengeStatus
        status={challenge.status}
        ip={challenge.ip}
        className="challenge-status"
      />
    </ChallengeStyled>
  );
};

export default Challenge;
