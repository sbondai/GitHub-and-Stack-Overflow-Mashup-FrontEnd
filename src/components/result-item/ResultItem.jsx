import React, { useState, useEffect } from "react";
import ResultItem from "../result-item/ResultItem";
import Spinner from "../../assets/spinner.gif";

const Results = ({ results }) => {
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
    <div className="results">
      {displayedResults.map((result, index) => (
        <ResultItem key={index} {...result} />
      ))}
      {isLoading && (
        <img src={Spinner} alt="Loading..." className="loading-icon" />
      )}
    </div>
  );
};

export default Results;
