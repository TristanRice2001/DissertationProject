import ChallengeStatusStyled from "./ChallengeStatusStyled";

interface Props {
  status: string;
  ip?: string | null;
  className?: string;
}

const ChallengeStatus = ({ status, ip, className }: Props) => {
  return (
    <ChallengeStatusStyled className={className}>
      <p>Status: {status}</p>
      <p>{ip}</p>
    </ChallengeStatusStyled>
  );
};

export default ChallengeStatus;
