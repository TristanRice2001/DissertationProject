import styled from "styled-components";

const HintsModalStyled = styled.div`
  dialog {
    border: none;
    width: min(90%, 300px);
  }

  .hint {
    padding: 30px;
    font-size: 20px;
    color: ${(props) => props.theme.color.color5};
    text-align: center;
  }

  .dots {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;

    button {
      background: none;
      border: none;
      cursor: pointer;

      img {
        margin-top: 3px;
      }
    }

    .progress-dot {
      width: 10px;
      height: 10px;
      border: 1px solid black;
      border-radius: 50%;

      &.selected {
        background: black;
      }
    }
  }
`;

export default HintsModalStyled;
