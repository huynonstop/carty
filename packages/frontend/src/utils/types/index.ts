import { Dispatch } from 'react';

export type MyContextWithDispatchType<S, A> = {
  authState: S;
  authDispatch: Dispatch<A>;
};

export type MyReducerAction<T, P = any> = {
  type: T;
  payload: P;
};
