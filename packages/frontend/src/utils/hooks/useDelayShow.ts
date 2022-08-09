import { useEffect, useState } from 'react';

export const useDelayShow = (
  isControlShow: boolean,
  timeout: number,
) => {
  const [isDelayShow, setIsDelayShow] = useState(isControlShow);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (isControlShow) {
      setIsDelayShow(true);
    } else {
      timeoutId = setTimeout(() => setIsDelayShow(false), timeout);
    }
    return () => clearTimeout(timeoutId);
  }, [isControlShow]);

  return [isDelayShow];
};
