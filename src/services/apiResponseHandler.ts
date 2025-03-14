import axios, { AxiosResponse } from "axios";

import { API_SERVER_ERROR_CODE, API_SERVER_ERROR_MESSAGE } from "../constants";
import { TodosResponse, ApiResponse } from "./types/apiResponse";

export const apiResponseHandler = async (
  request: Promise<AxiosResponse<TodosResponse>>
): Promise<ApiResponse> => {
  try {
    const { status, data } = await request;

    if (data) {
      return { data, status };
    }

    return {
      status,
      data: [],
      error: "",
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

    return { status: 500, error: API_SERVER_ERROR_MESSAGE, data: [] };
  }
};
