import axios, { AxiosResponse } from "axios";

import { TodosResponse } from "./types/apiResponse";
import { apiResponseHandler } from "./apiResponseHandler";
import { API_SERVER_ERROR_CODE, API_SERVER_ERROR_MESSAGE } from "../constants";

jest.mock("axios");

describe("apiResponseHandler", () => {
  it("should return data and status when request is successful", async () => {
    const response = {
      status: 200,
      data: { todos: [] },
      statusText: "OK",
      headers: {},
      config: {},
    } as unknown as AxiosResponse<TodosResponse>;
    (
      axios.request as jest.MockedFunction<typeof axios.request>
    ).mockResolvedValueOnce(response);

    const result = await apiResponseHandler(Promise.resolve(response));
    expect(result).toEqual({ data: { todos: [] }, status: 200 });
  });

  it("should return an error message and empty data when axios request fails", async () => {
    const error = {
      response: {
        status: 500,
        data: { error: "An unexpected error occurred." },
      },
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    };
    (
      axios.request as jest.MockedFunction<typeof axios.request>
    ).mockRejectedValueOnce(error);

    const result = await apiResponseHandler(Promise.reject(error));
    expect(result).toEqual({
      status: 500,
      error: "An unexpected error occurred.",
      data: [],
    });
  });

  it("should return a generic error message for unknown errors", async () => {
    const error = new Error("Some unexpected error");
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    const result = await apiResponseHandler(Promise.reject(error));
    expect(result).toEqual({
      status: 500,
      error: API_SERVER_ERROR_MESSAGE,
      data: [],
    });
  });

  it("should return a default error when no response is provided", async () => {
    const error = {
      message: "Network Error",
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    };
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);
    (
      axios.request as jest.MockedFunction<typeof axios.request>
    ).mockRejectedValueOnce(error);

    const result = await apiResponseHandler(Promise.reject(error));
    expect(result).toEqual({
      status: API_SERVER_ERROR_CODE,
      error: "Network Error",
      data: [],
    });
  });
});
