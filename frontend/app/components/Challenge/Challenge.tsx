import ActionButton from "components/ActionButton";
import ChallengePoints from "components/ChallengePoints";
import ChallengeProgressBar from "components/ChallengeProgressBar";
import ChallengeStatus from "components/ChallengeStatus";
import { Challenge as ChallengeType } from "types/challenge";
import ChallengeStyled from "./ChallengeStyled";

interface Props {
  challenge: ChallengeType;
  onStart: (chalId: number) => void;
  onHint: (hints: string[]) => void;
}

const Challenge = ({ challenge, onHint, onStart }: Props) => {
  const isChallengeActive = challenge.status === "active";

  const handleHintClick = () => {
    onHint(challenge.hints);
  };

  const handleStartClick = () => {
    onStart(challenge.id);
  };

  return (
    <ChallengeStyled>
      <ChallengePoints className="challenge-points" points={challenge.points} />
      <p className="challenge-name">{challenge.name}</p>
      <div className="challenge-buttons">
        <ActionButton
          variant="start"
          isDisabled={isChallengeActive}
          onClick={handleStartClick}
        />
        <ActionButton variant="stop" isDisabled={!isChallengeActive} />
        <ActionButton variant="reset" isDisabled={!isChallengeActive} />
        <ActionButton variant="hint" onClick={handleHintClick} />
      </div>
      {isChallengeActive &&
        challenge.secondsLeftForChallenge &&
        challenge.totalSecondsAvailavble && (
          <ChallengeProgressBar
            className="challenge-progress-bar"
            totalSecondsForChallenge={challenge.totalSecondsAvailavble}
            totalSecondsLeftForChallenge={challenge.secondsLeftForChallenge}
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
