/* eslint-disable no-console */
import "@testing-library/jest-dom";

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning: You are manually calling a React.PropTypes validation function/.test(
        args[0]
      )
    ) {
      return;
    }
    originalError.apply(console, args);
  };
});

afterAll(() => {
  console.error = originalError;
});
