import axios, { AxiosResponse } from "axios";

import { API_SERVER_ERROR_CODE, API_SUCCESS_CODE } from "../constants";
import { TodosResponse, ApiResponse } from "./types/apiResponse";

export const apiResponseHandler = async (
  request: Promise<AxiosResponse<TodosResponse>>
): Promise<ApiResponse> => {
  try {
    const { status, data } = await request;

    if (status === API_SUCCESS_CODE && data) {
      return { data, status };
    }

    return {
      status,
      data: [],
      error: "An unexpected error occurred.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;

      return {
        status: error.response?.status || API_SERVER_ERROR_CODE,
        error: message,
        data: [],
      };
    }

    return { status: 500, error: "An unexpected error occurred.", data: [] };
  }
};
