import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { sendMessage, createChannel } from '../sockets/index.js';

const SocketContext = createContext({});

export default function SocketProvider({ children }) {
  const memoizedValue = useMemo(() => ({ sendMessage, createChannel }));
  return (
    <SocketContext.Provider value={memoizedValue}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { SocketContext };
