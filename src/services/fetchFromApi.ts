import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestHeaders } from "axios";

import cache from "./apiCache";
import { apiClient } from "./apiClient";
import { API_SERVER_ERROR_MESSAGE } from "../constants";
import { apiResponseHandler } from "./apiResponseHandler";

const fetchFromApi: BaseQueryFn<
  {
    method: string;
    url: string;
    body?: unknown;
    headers?: AxiosRequestHeaders;
  },
  unknown,
  string | undefined
> = async (args) => {
  const { method, url, body, headers } = args;
  const cacheKey = `${method}:${url}`;

  if (cache.has(cacheKey)) {
    const cachedRes = cache.get(cacheKey);

    if (cachedRes !== undefined && method.toLocaleUpperCase() === "GET")
      return { data: cachedRes.data };
  }

  try {
    const request = apiClient(method, url, body, headers);
    const response = await apiResponseHandler(request);

    if (!response.error) {
      if (method.toLocaleUpperCase() === "GET") cache.set(cacheKey, response);
      return { data: response.data };
    }

    return { error: response.error };
  } catch {
    return { error: API_SERVER_ERROR_MESSAGE };
  }
};

export default fetchFromApi;
