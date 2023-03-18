import styled from "styled-components";

export const LeaderboardItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: min(90%, 700px);
  background: ${(props) => props.theme.color.color2};
  border-radius: 5px;
  padding: 10px 25px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  .username,
  .points {
    color: ${(props) => props.theme.color.color5};
  }

  .username {
    font-size: 24px;

    .index {
      font-size: 28px;
    }
  }

  .points {
    font-size: 28px;

    .ptsLetters {
      font-size: 18px;
    }
  }
`;
