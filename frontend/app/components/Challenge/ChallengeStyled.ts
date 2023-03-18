import styled, { css } from "styled-components";

const gridCss = css`
  grid-template-areas:
    "name name"
    "buttons pts"
    "status status"
    "progress-bar progress-bar";
  grid-template-columns: auto auto;
  width: 300px;
  row-gap: 5px;

  .challenge-progress-bar {
    padding: 0;
  }

  .challenge-points {
    margin: 0;
    flex-direction: row;
    gap: 2px;
  }
`;

const listCss = css`
  width: 100%;
  grid-template-areas:
    "pts name progress-bar status"
    "pts buttons progress-bar status";
  grid-template-columns: auto auto 1fr auto;
  grid-template-rows: auto auto;
`;

const ChallengeStyled = styled.div`
  background: ${(props) => props.theme.color.color2};
  border-radius: 5px;
  padding: 10px;
  display: grid;

  &.list {
    ${listCss}
  }

  &.grid {
    ${gridCss}
  }

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
    padding: 0 15px;
  }

  .challenge-status {
    grid-area: status;
  }

  @media only screen and (max-width: 500px) {
    && {
      ${gridCss}
      .challenge-buttons {
        gap: 5px;
      }
    }
  }
`;

export default ChallengeStyled;
