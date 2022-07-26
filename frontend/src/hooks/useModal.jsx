import { useContext } from 'react';

import { ModalContext } from '../context/ModalContext.jsx';

const useModal = () => useContext(ModalContext);

export default useModal;
