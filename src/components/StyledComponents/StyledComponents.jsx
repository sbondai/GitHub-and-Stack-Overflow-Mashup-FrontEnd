import styled from "styled-components";

export const LoadingIcon = styled.img`
  display: block;
  margin: auto;
  width: 40px;
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: ${({ $hasResults }) =>
    $hasResults ? "flex-start" : "center"};
  align-items: center;
  font-family: "Poppins", sans-serif;
  background: #d8f4fe;
  padding: 20px;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 8px 16px;

  .search-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  input {
    flex: none;
    width: 30vw;
    border: none;
    height: 36px;
    outline: none;
    font-size: 14px;
    color: #000;
  }

  button.clear {
    border: none;
    background: none;
    cursor: pointer;

    img {
      width: 18px;
      height: 18px;
      fill: #ccc;
    }

    &:hover img {
      fill: #999;
    }
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 60vw;
`;

export const ResultItem = styled.div`
  margin-bottom: 20px;
  h3 {
    margin: 0;
    a {
      text-decoration: none;
      color: #007bff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  p {
    margin: 5px 0;
  }
`;
