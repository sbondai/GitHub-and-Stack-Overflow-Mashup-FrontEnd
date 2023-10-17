import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchResults from "./SearchResults";

describe("<SearchResults />", () => {
  const mockOnTitleClick = jest.fn();
  const mockResultsGitHub = [
    {
      title: "Result 1",
      url: "https://github.com/test1",
      description: "Description 1",
      source: "GitHub",
    },
    {
      title: "Result 2",
      url: "https://github.com/test2",
      description: "Description 2",
      source: "GitHub",
    },
  ];
  const mockResultsStackOverflow = [
    {
      title: "Result 1",
      url: "https://stackoverflow.com/test1",
      description: "Description 1",
      source: "StackOverflow",
    },
    {
      title: "Result 2",
      url: "https://stackoverflow.com/test2",
      description: "Description 2",
      source: "StackOverflow",
    },
  ];

  it("renders the correct heading based on the source of the first result", () => {
    render(
      <SearchResults
        results={mockResultsGitHub}
        onTitleClick={mockOnTitleClick}
      />
    );
    expect(screen.getByText("Results from GitHub")).toBeInTheDocument();

    render(
      <SearchResults
        results={mockResultsStackOverflow}
        onTitleClick={mockOnTitleClick}
      />
    );
    expect(screen.getByText("Results from StackOverflow")).toBeInTheDocument();
  });

  it("renders a list of SearchItem components when there are results", () => {
    render(
      <SearchResults
        results={mockResultsGitHub}
        onTitleClick={mockOnTitleClick}
      />
    );
    expect(screen.getByText("Result 1")).toBeInTheDocument();
    expect(screen.getByText("Result 2")).toBeInTheDocument();
  });

  it('renders a "No results" message when there are no results', () => {
    render(<SearchResults results={[]} onTitleClick={mockOnTitleClick} />);
    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
