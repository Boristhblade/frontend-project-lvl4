import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, updateChannel, removeChannel } from '../slices/channelsSlice.js';
import { setChannel } from '../slices/currentChannelSlice.js';

const SocketContext = createContext({});

export default function SocketProvider({ children }) {
  const socket = io();
  const { currentChannel } = useSelector((state) => state.currentChannel);
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    const { id, ...changes } = payload;
    store.dispatch(updateChannel({ id, changes }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    if (id === currentChannel) {
      store.dispatch(setChannel(1));
    }
  });

  const sendMessage = (data) => {
    socket.emit('newMessage', data, (response) => {
      if (!response.status) {
        sendMessage(data);
      }
    });
  };

  const createChannel = (data, successCb, errCb) => {
    socket.emit('newChannel', data, (response) => {
      if (!response.status) {
        errCb();
      } else {
        successCb();
      }
    });
  };

  const renameChannel = (data, successCb, errCb) => {
    socket.emit('renameChannel', data, (response) => {
      if (!response.status) {
        errCb();
      } else {
        successCb();
      }
    });
  };

  const deleteChannel = (data, successCb, errCb) => {
    socket.emit('removeChannel', data, (response) => {
      if (!response.status) {
        errCb();
      } else {
        successCb();
      }
    });
  };
  const memoizedValue = useMemo(() => ({
    sendMessage, createChannel, deleteChannel, renameChannel,
  }));
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
