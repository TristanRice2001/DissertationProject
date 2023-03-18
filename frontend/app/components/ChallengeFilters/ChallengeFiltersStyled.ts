import styled from "styled-components";

export const ChallengeFiltersStyled = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;

  .search-input {
    width: 50%;

    .input-label {
      color: ${(props) => props.theme.color.color2};
    }
  }

  .view-filters {
    border-radius: 3px;
    border: 2px solid #d9d9d9;
    width: max-content;

    label {
      padding: 0 10px;
      cursor: pointer;
    }

    label:first-child {
      margin-right: 1px solid #d9d9d9;
    }
    input:checked + label {
      background: #d9d9d9;
    }

    input.view-filter-input {
      display: none;
    }
  }

  @media only screen and (max-width: 500px) {
    .search-input {
      width: 80%;
    }
  }
`;
