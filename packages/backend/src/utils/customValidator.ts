export const upperLowerDigit = (s: string) => {
  const regex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  );
  return regex.test(s);
};
