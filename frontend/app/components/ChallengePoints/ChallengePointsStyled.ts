import styled from "styled-components";

const ChallengePointsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 15px 0 5px;

  p {
    font-weight: bold;
    font-size: 20px;
  }

  p:last-child {
    line-height: 12px;
  }
`;

export default ChallengePointsStyled;
