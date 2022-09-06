import { useEffect, DependencyList } from 'react';

export const useFetchWithAbortEffect = (
  wrapper: (signal: AbortSignal, controller: AbortController) => void,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    wrapper(signal, controller);
    return () => {
      controller.abort();
    };
  }, deps);
};
