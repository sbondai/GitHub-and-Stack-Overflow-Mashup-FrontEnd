import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders the SearchBox component", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(
      /Please enter keyword to search Github posts.../i
    );
    expect(inputElement).toBeInTheDocument();
  });
});
