import { ApiResponse } from "./types/apiResponse";

class Cache {
  private cache: Map<string, ApiResponse>;

  constructor() {
    this.cache = new Map();
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: ApiResponse) {
    this.cache.set(key, value);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new Cache();

export default cache;
