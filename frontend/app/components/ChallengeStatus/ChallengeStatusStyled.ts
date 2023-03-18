import styled from "styled-components";

const ChallengeStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => props.theme.color.color5};

  .mobileDash {
    margin: 0 10px;
    display: none;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    justify-content: flex-start;

    .mobileDash {
      display: block;
    }
  }
`;

export default ChallengeStatus;
