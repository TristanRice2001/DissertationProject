import styled from "styled-components";

interface Props {
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const SubmitButtonStyled = styled.button<Props>`
  padding: 9px 0;
  color: white;
  outline: none;
  font-size: 16px;
  background: ${(props) => props.theme.color.color5};
  border-radius: 5px;
  ${(props) => (props.isDisabled || props.isLoading) && "pointer-events: none;"}
  cursor: ${(props) =>
    props.isDisabled || props.isLoading ? "not-allowed" : "pointer"};
  opacity: ${(props) => (props.isDisabled || props.isLoading ? "0.5" : "1")};

  @keyframes animate-loading {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  .loadingAnimation {
    display: flex;
    justify-content: center;

    div {
      animation: animate-loading infinite linear 500ms;
    }

    div:nth-child(2) {
      animation-delay: 100ms;
    }

    div:nth-child(3) {
      animation-delay: 200ms;
    }
  }
`;
