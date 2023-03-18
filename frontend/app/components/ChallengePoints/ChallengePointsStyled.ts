import styled from "styled-components";

const ChallengePointsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 15px 0 5px;

  p {
    font-weight: bold;
    color: ${(props) => props.theme.color.color5};
    font-size: 20px;
  }

  p:last-child {
    line-height: 12px;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 5px;
  }
`;

export default ChallengePointsStyled;
