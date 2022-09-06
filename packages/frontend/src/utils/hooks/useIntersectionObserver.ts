import { useRef, useEffect } from 'react';
export const useIntersectionObserver = (
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const elementRef = useRef<any>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(cb, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);
  return elementRef;
};
