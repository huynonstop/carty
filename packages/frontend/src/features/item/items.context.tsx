import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type ItemsContextType = {
  items: Array<any>;
  setItems: Dispatch<SetStateAction<Array<any>>>;
  modalItem: any;
  setModalItem: Dispatch<SetStateAction<any>>;
};

export const ItemsContext = createContext<ItemsContextType>(
  {} as ItemsContextType,
);

export const ItemsProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [modalItem, setModalItem] = useState<any>(null);
  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        modalItem,
        setModalItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  const { items, setItems, modalItem, setModalItem } =
    useContext(ItemsContext);
  return { items, setItems, modalItem, setModalItem };
};
