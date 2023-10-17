import React from "react";

const SearchItem = ({ title, url, description, onTitleClick }) => {
  const isGitHub = url.startsWith("https://github.com/");

  const handleTitleClick = (e) => {
    if (isGitHub) {
      e.preventDefault();
      onTitleClick(title);
    }
  };

  return (
    <div className="result-item">
      <h3>
        <a href={url} onClick={handleTitleClick}>
          {title}
        </a>
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default SearchItem;
