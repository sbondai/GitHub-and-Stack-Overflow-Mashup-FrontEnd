import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import Spinner from "../../assets/spinner.gif";

const SearchResults = ({ results, onTitleClick }) => {
  const [displayedResults, setDisplayedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisplayedResults(results.slice(0, 10));
  }, [results]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      if (nearBottom && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          const nextResults = results.slice(
            displayedResults.length,
            displayedResults.length + 10
          );
          setDisplayedResults([...displayedResults, ...nextResults]);
          setIsLoading(false);
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [displayedResults, isLoading, results]);

  return (
    <div className="search-results">
      <h2>
        {results[0]?.source === "GitHub"
          ? "Results from GitHub"
          : "Results from StackOverflow"}
      </h2>
      {displayedResults.length > 0 ? (
        displayedResults.map((result, index) => (
          <SearchItem key={index} {...result} onTitleClick={onTitleClick} />
        ))
      ) : (
        <div>No results</div>
      )}
      {isLoading && (
        <img src={Spinner} alt="Loading..." className="loading-icon" />
      )}
    </div>
  );
};

export default SearchResults;
