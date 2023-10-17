import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Results from "./Results";

jest.mock("../result-item/ResultItem", () => (props) => (
  <div>Result Item {props.id}</div>
));

describe("<Results />", () => {
  // Initial Render:
  it("renders without crashing", () => {
    render(<Results results={[]} />);
  });

  it("renders ResultItem components based on the initial results prop", () => {
    const initialResults = Array(10)
      .fill(null)
      .map((_, index) => ({ id: index }));
    render(<Results results={initialResults} />);
    const resultItems = screen.getAllByText(/Result Item \d/);
    expect(resultItems).toHaveLength(10);
  });

  it("does not render ResultItem components when the results prop is an empty array", () => {
    render(<Results results={[]} />);
    const resultItems = screen.queryAllByText(/Result Item \d/);
    expect(resultItems).toHaveLength(0);
  });

  it("loading spinner is not visible on initial render", () => {
    render(<Results results={[]} />);
    const spinner = screen.queryByAltText("Loading...");
    expect(spinner).not.toBeInTheDocument();
  });

  it("updates displayed results when the results prop changes", async () => {
    const initialResults = Array(10)
      .fill(null)
      .map((_, index) => ({ id: index }));
    const { rerender } = render(<Results results={initialResults} />);
    let resultItems = screen.getAllByText(/Result Item \d/);
    expect(resultItems).toHaveLength(10);

    const newResults = [
      ...initialResults,
      ...Array(10)
        .fill(null)
        .map((_, index) => ({ id: index + 10 })),
    ];
    rerender(<Results results={newResults} />);
    resultItems = screen.getAllByText(/Result Item \d/);
    expect(resultItems).toHaveLength(10);
  });

  it("calls the handleScroll function when user scrolls", async () => {
    const { container, getByAltText } = render(
      <Results
        results={Array(10)
          .fill(null)
          .map((_, index) => ({ id: index }))}
      />
    );
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    await waitFor(() => {
      expect(getByAltText("Loading...")).toBeInTheDocument();
    });
  });

  it("adds and removes window event listeners for scrolling properly", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<Results results={Array(10).fill({})} />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
