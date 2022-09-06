import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export const useInput = <T extends any>(
  initState: T,
): [
  T,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  Dispatch<SetStateAction<T>>,
] => {
  const [inputState, setInputState] = useState<T>(initState);
  const onInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputState(e.target.value as T);
  };
  return [inputState, onInputChange, setInputState];
};
