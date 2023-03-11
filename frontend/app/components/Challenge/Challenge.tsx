import ActionButton from "components/ActionButton";
import ChallengePoints from "components/ChallengePoints";
import ChallengeProgressBar from "components/ChallengeProgressBar";
import ChallengeStatus from "components/ChallengeStatus";
import ChallengeTitle from "components/ChallengeTitle";
import { Challenge as ChallengeType } from "types/challenge";
import ChallengeStyled from "./ChallengeStyled";

interface Props {
  challenge: ChallengeType;
  isStartLoading: boolean;
  onStart: (chalId: number) => void;
  onHint: (hints: string[]) => void;
  onSubmitFlag: (chalId: number) => void;
  onTermination: (chalId: number) => void;
}

const Challenge = ({
  challenge,
  isStartLoading,
  onHint,
  onStart,
  onTermination,
  onSubmitFlag,
}: Props) => {
  const isChallengeActive = challenge.status === "active";

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
    <ChallengeStyled>
      <ChallengePoints className="challenge-points" points={challenge.points} />
      <ChallengeTitle
        className="challenge-name"
        name={challenge.name}
        isCompleted={challenge.completed}
      />
      <p className="challenge-name">{challenge.name}</p>
      <div className="challenge-buttons">
        <ActionButton
          variant="start"
          isDisabled={isStartLoading || isChallengeActive}
          onClick={handleStartClick}
        />
        <ActionButton
          variant="stop"
          onClick={handleTerminationClick}
          isDisabled={!isChallengeActive}
        />
        <ActionButton variant="reset" isDisabled={!isChallengeActive} />
        <ActionButton variant="hint" onClick={handleHintClick} />
        <ActionButton variant="submit" onClick={handleSubmitFlagClick} />
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
