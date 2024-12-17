const BASE_URL = "http://127.0.0.1:8000";

export const getApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/api/${endpoint}`;
};
