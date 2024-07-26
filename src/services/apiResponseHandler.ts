import axios, { AxiosResponse } from "axios";
import { TodosResponse, ApiResponse } from "./types/apiResponse";

export const apiResponseHandler = async (
  request: Promise<AxiosResponse<TodosResponse>>
): Promise<ApiResponse> => {
  try {
    const { status, data } = await request;

    if (status === 200 && data) {
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
        status: error.response?.status || 500,
        error: message,
        data: [],
      };
    }

    return { status: 500, error: "An unexpected error occurred.", data: [] };
  }
};
