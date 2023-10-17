import React, { useState, useRef } from "react";
import {
  Container,
  SearchContainer,
  ResultsContainer,
} from "../StyledComponents/StyledComponents";
import SearchIcon from "../../assets/search-icon.svg";
import ClearButton from "../clear-button/ClearButton";
import SearchResults from "../search-results/SearchResults";
import {
  searchGitHubProjects,
  searchRelatedStackOverflowQuestions,
} from "../../utils/data";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const [noResults, setNoResults] = useState(false);

  const onClear = () => {
    setKeyword("");
    inputRef.current.focus();
    setNoResults(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const searchResults = await searchGitHubProjects(keyword);
      if (!searchResults || searchResults.length === 0) {
        setNoResults(true);
        setResults([]);
        return;
      }

      const enhancedResults = searchResults.map((res) => ({
        ...res,
        source: "GitHub",
      }));

      setResults(enhancedResults);
    }
  };

  const handleTitleClick = async (title) => {
    const searchResults = await searchRelatedStackOverflowQuestions(title);
    const enhancedResults = searchResults.map((res) => ({
      ...res,
      source: "StackOverflow",
    }));

    if (enhancedResults.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setResults(enhancedResults);
  };

  return (
    <Container $hasResults={results.length > 0 || noResults}>
      <SearchContainer>
        <img src={SearchIcon} alt="Search" className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Please enter keyword to search Github posts..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {keyword && (
          <ClearButton className="clear" onClick={onClear}></ClearButton>
        )}
      </SearchContainer>
      {results.length > 0 ? (
        <ResultsContainer>
          <SearchResults results={results} onTitleClick={handleTitleClick} />
        </ResultsContainer>
      ) : noResults && keyword ? (
        <ResultsContainer>
          <div>No results found.</div>
        </ResultsContainer>
      ) : null}
    </Container>
  );
};

export default SearchBox;
