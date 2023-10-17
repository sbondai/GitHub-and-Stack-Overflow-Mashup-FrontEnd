import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchItem from "./SearchItem"; // adjust the import to your file structure

describe("<SearchItem />", () => {
  const mockOnTitleClick = jest.fn();

  beforeEach(() => {
    mockOnTitleClick.mockClear();
  });

  it("renders the title, url, and description correctly", () => {
    render(
      <SearchItem
        title="Test Title"
        url="https://github.com/test"
        description="Test Description"
        onTitleClick={mockOnTitleClick}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Test Title" })).toHaveAttribute(
      "href",
      "https://github.com/test"
    );
  });

  it("calls onTitleClick with title as argument when title is clicked and url starts with https://github.com/", () => {
    render(
      <SearchItem
        title="Test Title"
        url="https://github.com/test"
        description="Test Description"
        onTitleClick={mockOnTitleClick}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));
    expect(mockOnTitleClick).toHaveBeenCalledWith("Test Title");
  });

  it("does not call onTitleClick when title is clicked and url does not start with https://github.com/", () => {
    render(
      <SearchItem
        title="Test Title"
        url="https://example.com/test"
        description="Test Description"
        onTitleClick={mockOnTitleClick}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));
    expect(mockOnTitleClick).not.toHaveBeenCalled();
  });
});
