const RangeTime = {
  ms: 1,
  sec: 1000,
  min: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
};

export const justUpdated = 'Have just updated';

export const lastUpdateBefore = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);
  const msBefore = Date.now() - updatedDate.getTime();
  if (msBefore >= RangeTime.day) {
    return `${Math.floor(msBefore / RangeTime.day)} day ago`;
  }
  if (msBefore >= RangeTime.hour) {
    return `${Math.floor(msBefore / RangeTime.hour)} hour ago`;
  }
  if (msBefore >= RangeTime.min) {
    return `${Math.floor(msBefore / RangeTime.min)} min ago`;
  }
  if (msBefore >= RangeTime.sec) {
    return `${Math.floor(msBefore / RangeTime.sec)} sec ago`;
  }
  return justUpdated;
};
