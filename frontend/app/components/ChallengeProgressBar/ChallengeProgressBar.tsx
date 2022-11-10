import { convertSecondsToReadableTimeFormat } from "helpers";
import useTimer from "hooks/useTimer";
import ChallengeProgressBarStyled, {
  ProgressBar,
} from "./ChallengeProgressBarStyled";

interface Props {
  totalSecondsForChallenge: number;
  totalSecondsLeftForChallenge: number;
  className?: string;
}

const ChallengeProgressBar = ({
  totalSecondsForChallenge,
  totalSecondsLeftForChallenge,
  className,
}: Props) => {
  console.log(totalSecondsLeftForChallenge);
  const secondsElapsed = useTimer();
  const timeRemainingForUser = totalSecondsLeftForChallenge - secondsElapsed;
  const secondsToDisplay = timeRemainingForUser > 0 ? timeRemainingForUser : 0;
  const formattedTimeRemaining =
    convertSecondsToReadableTimeFormat(secondsToDisplay);
  const percentageTimeRemaining =
    ((totalSecondsLeftForChallenge - secondsElapsed) /
      totalSecondsForChallenge) *
    100;
  return (
    <ChallengeProgressBarStyled className={className}>
      {formattedTimeRemaining}
      <ProgressBar percentageTimeRemaining={percentageTimeRemaining} />
    </ChallengeProgressBarStyled>
  );
};

export default ChallengeProgressBar;
