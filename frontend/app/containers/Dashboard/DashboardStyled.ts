import styled from "styled-components";

const DashboardStyled = styled.div`
  flex-grow: 1;
  padding-top: 50px;
  background: ${(props) => props.theme.color.color1};
  min-height: 100%;
  padding-bottom: 50px;

  .challenge-container {
    margin: 0 auto;
    width: 90%;
    max-width: 1000px;
    display: flex;
    gap: 20px;

    &.list {
      flex-direction: column;
      align-items: center;
    }

    &.grid {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;

export default DashboardStyled;
