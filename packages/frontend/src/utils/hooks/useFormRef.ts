import { useRef } from 'react';

const useFormRef = () => {
  const formRef = useRef<
    Record<string, HTMLInputElement | { value: any }>
  >({});
  const createInputRef =
    (field: string) => (el: HTMLInputElement) => {
      formRef.current[field] = el;
    };
  const createField = (field: string) => (defaultValue: any) => {
    formRef.current[field] = { value: defaultValue };
  };
  const setFieldValue = (field: string) => (value: any) => {
    formRef.current[field].value = value;
  };
  const getFieldValue = (field: string) => {
    return formRef.current[field].value;
  };
  const getFormData = () => {
    return Object.keys(formRef.current).reduce<
      Record<string, string>
    >((pre, field) => {
      pre[field] = getFieldValue(field);
      return pre;
    }, {});
  };
  return [
    formRef,
    {
      createInputRef,
      createField,
      setFieldValue,
      getFieldValue,
      getFormData,
    },
  ];
};

export default useFormRef;
