import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";
import {
  searchGitHubProjects,
  searchRelatedStackOverflowQuestions,
} from "../../utils/data";

jest.mock("../../utils/data", () => ({
  searchGitHubProjects: jest.fn(),
  searchRelatedStackOverflowQuestions: jest.fn(),
}));

describe("<SearchBox />", () => {
  it("renders without crashing", () => {
    render(<SearchBox />);
  });

  it("changes input value as user types", () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    ) as HTMLInputElement;
    userEvent.type(input, "React");
    expect(input.value).toBe("React");
  });

  it("clears the input value and results when clear button is clicked", () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    ) as HTMLInputElement;
    userEvent.type(input, "React");
    userEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(input.value).toBe("");
  });

  it("searches GitHub projects and updates results on Enter key press", async () => {
    (searchGitHubProjects as jest.Mock).mockResolvedValue([
      {
        title: "React Project",
        url: "https://github.com/facebook/react",
        description: "A JavaScript library for building user interfaces",
        source: "GitHub",
      },
    ]);
    render(<SearchBox />);
    const input = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    );
    userEvent.type(input, "React");
    await userEvent.type(input, "{enter}");
    expect(await screen.findByText("React Project")).toBeInTheDocument();
  });

  xit("searches related StackOverflow questions and updates results on title click", async () => {
    (searchRelatedStackOverflowQuestions as jest.Mock).mockResolvedValue([
      {
        title: "React Question",
        url: "https://stackoverflow.com/questions/12345",
        description: "react, javascript",
        source: "StackOverflow",
      },
    ]);
    render(<SearchBox />);
    const input = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    );
    userEvent.type(input, "React");
    await userEvent.type(input, "{enter}");
    userEvent.click(await screen.findByText("React Project"));
    expect(await screen.findByText("React Question")).toBeInTheDocument();
  });

  it("displays no results found when there are no results", async () => {
    (searchGitHubProjects as jest.Mock).mockResolvedValue([]);
    render(<SearchBox />);
    const input = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    );
    userEvent.type(input, "Unknown");
    await userEvent.type(input, "{enter}");
    expect(await screen.findByText("No results found.")).toBeInTheDocument();
  });
});
