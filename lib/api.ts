export class ApiError extends Error {
  private url: string;
  public status: number;

  constructor(url: string, status: number) {
    super(`${url} returned ${status}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";

    this.url = url;
    this.status = status;
  }
}

export async function fetchJson(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(url, response.status);
  }

  return await response.json();
}
