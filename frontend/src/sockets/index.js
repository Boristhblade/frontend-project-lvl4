import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, updateChannel, removeChannel } from '../slices/channelsSlice.js';
import { setChannel } from '../slices/currentChannelSlice.js';

const socket = io();

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

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload));
  const { currentChannel } = useSelector((state) => state.currentChannel);
  if (payload.id === currentChannel) {
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
  socket.emit('removeChannel', { id: data }, (response) => {
    if (!response.status) {
      errCb();
    } else {
      successCb();
    }
  });
};

export {
  sendMessage, createChannel, renameChannel, deleteChannel,
};
