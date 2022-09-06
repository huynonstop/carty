export const debounced = (
  cb: (...args: any[]) => any | Promise<any>,
  timeout: number,
) => {
  let timer: number | undefined = undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(cb, timeout, ...args);
  };
};
