export const jsonFetch = (
  url: string,
  data: any,
  options: RequestInit,
) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
};
