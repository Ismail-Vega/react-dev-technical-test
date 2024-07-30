import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

const ProblematicComponent = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary", () => {
  it("renders children correctly when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Safe Content")).toBeInTheDocument();
  });

  it("renders fallback UI when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Something went wrong. Please try again later.")
    ).toBeInTheDocument();
  });
});
