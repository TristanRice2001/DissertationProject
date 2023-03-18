import styled from "styled-components";

export const DesktopContentStyled = styled.div`
  display: none;

  @media only screen and (min-width: 500px) {
    display: block;
  }
`;
