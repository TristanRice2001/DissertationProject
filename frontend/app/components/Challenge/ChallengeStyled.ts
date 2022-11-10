import styled from "styled-components";

const ChallengeStyled = styled.div`
  background: white;
  padding: 10px;
  display: grid;
  width: 100%;
  grid-template-areas:
    "pts name progress-bar status"
    "pts buttons progress-bar status";
  grid-template-columns: auto auto 1fr auto;
  grid-template-rows: auto auto;

  .challenge-points {
    grid-area: pts;
  }

  .challenge-name {
    grid-area: name;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .challenge-buttons {
    display: flex;
    gap: 15px;
    grid-area: buttons;
    align-items: center;
  }

  .challenge-progress-bar {
    grid-area: progress-bar;
  }

  .challenge-status {
    grid-area: status;
  }
`;

export default ChallengeStyled;
