import { useState } from 'react';

export const useToggleModal = (
  defaultState: boolean,
): [boolean, () => void, () => void] => {
  const [isShowModal, setShowModal] = useState(defaultState);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  return [isShowModal, closeModal, openModal];
};
