export const jsonFetch = (
  url: string,
  { accessToken, ...data }: any,
  options: RequestInit,
) => {
  const request: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    ...options,
  };
  if (options.method !== 'GET') {
    request.body = JSON.stringify(data);
  }
  return fetch(url, request);
};
