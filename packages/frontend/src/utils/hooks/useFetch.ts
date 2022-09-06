import { Dispatch, SetStateAction, useState } from 'react';
import { APIRequest } from '../fetch';
export const useFetch = <T = any>(
  initData: T,
): [
  T,
  (
    fetchRequest: APIRequest,
    data: any,
    mapper?: (data: any) => any,
    callback?: (data: any) => any,
    isSetData?: boolean,
  ) => Promise<void>,
  {
    loading: boolean;
    error: any;
    clearData: () => void;
    setData: Dispatch<SetStateAction<T>>;
  },
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T>(initData);
  const fetchRequestWrapper = async (
    fetchRequest: APIRequest,
    data: any,
    mapper?: (data: any) => any,
    callback?: (data: any) => any,
    isSetData: boolean = true,
  ) => {
    setLoading(true);
    try {
      const res = await fetchRequest(data);
      const resData = await res.json();
      if (res.status !== 200) {
        throw resData;
      }
      const newData = mapper ? mapper(resData) : resData;
      isSetData && setData(newData);
      callback && callback(resData);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const clearData = () => {
    setData(initData);
  };
  return [
    data,
    fetchRequestWrapper,
    { loading, error, clearData, setData },
  ];
};
