import styled from "styled-components";

export const LeaderboardStyled = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 50px;
  background: ${(props) => props.theme.color.color1};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;

  .title {
    margin-bottom: 20px;
  }
`;
