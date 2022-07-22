import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import sendMessage from '../sockets/index.js';

const SocketContext = createContext({});

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={sendMessage}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { SocketContext };
