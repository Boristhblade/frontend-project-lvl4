import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext({});

export default function ModalProvider({ children, handler }) {
  return (
    <ModalContext.Provider value={handler}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
  handler: PropTypes.func.isRequired,
};

export { ModalContext };
