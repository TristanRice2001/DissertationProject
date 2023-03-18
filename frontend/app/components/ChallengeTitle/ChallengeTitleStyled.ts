import styled from "styled-components";

export const ChallengeTitleStyled = styled.div`
  word-wrap: anywhere;
  color: ${(props) => props.theme.color.color5};
  .test-outline {
    shape-outside: inset(50px 50px);
    float: right;
    width: 50px;
    height: 50px;
  }
`;
