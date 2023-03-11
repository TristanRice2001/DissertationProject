import { ChallengeTitleStyled } from "./ChallengeTitleStyled";

interface Props {
  name: string;
  isCompleted: boolean;
  className?: string;
}

const ChallengeTitle = ({ name, isCompleted, className }: Props) => {
  const completedString = "- completed";
  return (
    <ChallengeTitleStyled className={className}>
      {name}
      {isCompleted && completedString}
    </ChallengeTitleStyled>
  );
};

export default ChallengeTitle;
