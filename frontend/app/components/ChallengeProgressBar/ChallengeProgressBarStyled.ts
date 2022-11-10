import styled from "styled-components";

interface ProgressBarProps {
  percentageTimeRemaining: number;
}

const ChallengeProgressBarStyled = styled.div``;

export const ProgressBar = styled.div<ProgressBarProps>`
  width: 100%;
  position: relative;
  height: 10px;

  &::before {
    content: "";
    display: block;
    background: blue;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${(props) => props.percentageTimeRemaining}%;
  }
`;

export default ChallengeProgressBarStyled;
