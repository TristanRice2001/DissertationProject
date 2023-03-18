import styled from "styled-components";

export const MobileContentStyled = styled.div`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
  }
`;
