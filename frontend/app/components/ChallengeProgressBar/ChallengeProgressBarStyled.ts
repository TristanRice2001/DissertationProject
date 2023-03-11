import styled from "styled-components";

interface ProgressBarProps {
  percentageTimeRemaining: number;
}

const ChallengeProgressBarStyled = styled.div``;

export const ProgressBar = styled.div.attrs(
  ({ percentageTimeRemaining }: ProgressBarProps) => ({
    style: {
      width: `${percentageTimeRemaining}%`,
    },
  })
)<ProgressBarProps>`
  height: 10px;
  background: blue;
`;

export default ChallengeProgressBarStyled;
