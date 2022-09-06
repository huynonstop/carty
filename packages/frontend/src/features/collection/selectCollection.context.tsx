import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SelectCollectionContextType = {
  selectId: string;
  setSelectId: Dispatch<SetStateAction<string>>;
};

export const SelectCollectionContext =
  createContext<SelectCollectionContextType>(
    {} as SelectCollectionContextType,
  );

export const SelectCollectionProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [selectId, setSelectId] = useState<string>('');
  return (
    <SelectCollectionContext.Provider
      value={{
        selectId,
        setSelectId,
      }}
    >
      {children}
    </SelectCollectionContext.Provider>
  );
};

export const useSelectCollectionContext = () => {
  const { selectId, setSelectId } = useContext(
    SelectCollectionContext,
  );
  const isSelected = () => selectId !== '';
  const clearSelect = () => setSelectId('');
  return { selectId, setSelectId, isSelected, clearSelect };
};
