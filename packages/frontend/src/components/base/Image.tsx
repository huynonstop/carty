import { memo } from 'react';

export const Image = memo(function ({ className, src, alt }: any) {
  return <img className={className} src={src} alt={alt} />;
});
