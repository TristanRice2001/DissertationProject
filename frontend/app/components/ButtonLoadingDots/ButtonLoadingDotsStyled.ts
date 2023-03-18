import styled from "styled-components";

export const ButtonLoadingDotsStyled = styled.div`
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
`;
