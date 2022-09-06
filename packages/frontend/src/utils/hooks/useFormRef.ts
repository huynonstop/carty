import { useRef, MutableRefObject } from 'react';

const useFormRef = (): [
  MutableRefObject<Record<string, HTMLInputElement>>,
  {
    createInputRef: (field: string) => (value: any) => void;
    getFieldValue: (field: string) => string | boolean;
    getFormData: () => Record<string, string | boolean>;
  },
] => {
  const formRef = useRef<Record<string, HTMLInputElement>>({});
  const createInputRef =
    (field: string) => (el: HTMLInputElement) => {
      formRef.current[field] = el;
    };
  const getFieldValue = (field: string) => {
    if (formRef.current[field].type === 'checkbox') {
      return formRef.current[field].checked;
    }
    return formRef.current[field].value;
  };
  const getFormData = () => {
    return Object.keys(formRef.current).reduce<
      Record<string, string | boolean>
    >((pre, field) => {
      pre[field] = getFieldValue(field);
      return pre;
    }, {});
  };
  return [
    formRef,
    {
      createInputRef,
      getFieldValue,
      getFormData,
    },
  ];
};

export default useFormRef;
