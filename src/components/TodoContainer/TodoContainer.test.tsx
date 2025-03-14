import { ReactNode } from "react";
import { render } from "@testing-library/react";

import TodoContainer from "./TodoContainer";
import { useGetTodosQuery } from "../../store";
import { API_SERVER_ERROR_MESSAGE } from "../../constants";
import { setError, setLoading } from "../../store/slices/todoListsSlice";

const dispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => dispatch,
  useSelector: jest.fn(),
  useStore: jest.fn(),
}));

const mockEnqueueSnackbar = jest.fn();

jest.mock("notistack", () => ({
  enqueueSnackbar: (message: string, options: { variant: string }) =>
    mockEnqueueSnackbar(message, options),
}));

jest.mock("../../store", () => ({
  useGetTodosQuery: jest.fn(),
}));

const mockChildren: ReactNode = <div>Child Component</div>;

describe("TodoContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches setLoading when isLoading changes", () => {
    (useGetTodosQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      error: null,
    }));

    render(<TodoContainer>{mockChildren}</TodoContainer>);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it("dispatches setError when error is defined", () => {
    (useGetTodosQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: "Test Error",
    }));

    render(<TodoContainer>{mockChildren}</TodoContainer>);

    expect(dispatch).toHaveBeenCalledWith(setError("Test Error"));
  });

  it("Shows snackbar when there is an error", () => {
    (useGetTodosQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: "Test Error",
    }));

    render(<TodoContainer>{mockChildren}</TodoContainer>);

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Test Error", {
      variant: "error",
      autoHideDuration: 3000,
    });
  });

  it("dispatches setError with default message when error message is not defined", () => {
    (useGetTodosQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      error: {},
    }));

    render(<TodoContainer>{mockChildren}</TodoContainer>);

    expect(dispatch).toHaveBeenCalledWith(setError(API_SERVER_ERROR_MESSAGE));
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(API_SERVER_ERROR_MESSAGE, {
      variant: "error",
      autoHideDuration: 3000,
    });
  });
});
