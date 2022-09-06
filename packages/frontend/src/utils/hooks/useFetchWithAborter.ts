import { useRef } from 'react';

export const useFetchWithAborter = (
  fetchRequest: (
    data: any,
    signal: AbortSignal,
    clearAborter: () => void,
  ) => Promise<void>,
) => {
  const aborter = useRef<any>(null);
  const fetchWithAborter = (data: any) => {
    if (aborter.current) {
      aborter.current();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    fetchRequest(data, signal, () => {
      aborter.current = null;
    });
    aborter.current = () => controller.abort('');
  };
  return [fetchWithAborter];
};
