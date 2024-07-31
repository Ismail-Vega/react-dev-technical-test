import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div data-testid="errorBoundary">
            Something went wrong. Please try again later.
          </div>
          <div data-testid="errorInfo">
            Something went wrong. Please try again later.
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
