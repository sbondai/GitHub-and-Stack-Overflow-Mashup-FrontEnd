import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClearButton from "./ClearButton";

describe("<ClearButton />", () => {
  it("renders a clear button", () => {
    const noop = () => {};
    render(<ClearButton onClick={noop} />);
    const button = screen.getByRole("button", { name: /Clear/i });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<ClearButton onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /Clear/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
