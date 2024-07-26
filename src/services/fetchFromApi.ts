import { AxiosRequestHeaders } from "axios";
import { apiClient } from "./apiClient";
import { apiResponseHandler } from "./apiResponseHandler";
import cache from "./apiCache";

export const fetchFromApi = async (
  method: string,
  query: string,
  data?: unknown,
  headers?: AxiosRequestHeaders
) => {
  const cacheKey = `${method}:${query}`;

  if (cache.has(cacheKey)) {
    const cachedRes = cache.get(cacheKey);
    if (cachedRes !== undefined) return cachedRes;
  }

  const request = apiClient(method, query, data, headers);
  const response = await apiResponseHandler(request);

  if (!response.error) {
    cache.set(cacheKey, response);
  }

  return response;
};