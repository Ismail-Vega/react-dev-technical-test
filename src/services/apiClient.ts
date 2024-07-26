import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { TodosResponse } from "./types/apiResponse";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiClient = (
  method: string,
  url: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
): Promise<AxiosResponse<TodosResponse>> => {
  return axiosInstance.request<TodosResponse>({
    method,
    url,
    data,
    headers,
  });
};
