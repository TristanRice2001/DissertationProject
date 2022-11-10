import ChallengePointsStyled from "./ChallengePointsStyled";

interface Props {
  points: number;
  className?: string;
}

const ChallengePoints = ({ points, className }: Props) => {
  return (
    <ChallengePointsStyled className={className}>
      <p>{points}</p>
      <p>PTS</p>
    </ChallengePointsStyled>
  );
};

export default ChallengePoints;
