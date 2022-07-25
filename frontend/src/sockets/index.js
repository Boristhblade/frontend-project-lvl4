import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel } from '../slices/channelsSlice.js';

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload));
});

const sendMessage = (data) => {
  socket.emit('newMessage', data, (response) => {
    if (!response.status) {
      sendMessage(data);
    }
  });
};

const createChannel = (data) => {
  socket.emit('newChannel', data, (response) => {
    if (!response.status) {
      createChannel(data);
    }
  });
};

export { sendMessage, createChannel };
