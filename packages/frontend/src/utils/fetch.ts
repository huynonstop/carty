export type FetchRequest = (
  url: string,
  { accessToken, ...data }: any,
  options: RequestInit,
) => Promise<Response>;

export type APIRequest<T = any> = (data: T) => Promise<Response>;

export const jsonFetch: FetchRequest = (
  url,
  { accessToken, signal, ...data },
  options,
) => {
  const request: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
    ...options,
  };
  if (options.method !== 'GET') {
    request.body = JSON.stringify(data);
  }
  return fetch(url, request);
};
