import ky from "ky";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseApi = ky.create({ prefixUrl: baseUrl });

export interface HTTPError extends Error {
  response: {
    json: () => Promise<{ message: string }>;
  };
}

export function isHTTPError(error: unknown): error is HTTPError {
  return (error as HTTPError).response?.json !== undefined;
}

export default baseApi;
