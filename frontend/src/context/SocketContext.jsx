import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, updateChannel, removeChannel } from '../slices/channelsSlice.js';
import { setChannel } from '../slices/currentChannelSlice.js';

const SocketContext = createContext({});

export default function SocketProvider({ socket, children }) {
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
      store.dispatch(setChannel({ id: 1 }));
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
      const { status, data: { id } } = response;
      if (status === 'ok') {
        console.log(typeof id);
        store.dispatch(setChannel({ id }));
        successCb();
      } else {
        errCb();
      }
    });
  };

  const renameChannel = (data, successCb, errCb) => {
    socket.emit('renameChannel', data, ({ status }) => {
      if (status === 'ok') {
        successCb();
      } else {
        errCb();
      }
    });
  };

  const deleteChannel = (data, successCb, errCb) => {
    socket.emit('removeChannel', data, ({ status }) => {
      if (status === 'ok') {
        successCb();
      } else {
        errCb();
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

SocketContext.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired
}
