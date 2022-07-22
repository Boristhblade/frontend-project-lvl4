import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';

const socket = io();

socket.on('newMessage', (payload) => {
  console.log('SOCKET ON');
  console.log(payload);
  store.dispatch(addMessage(payload));
});

const sendMessage = (data) => {
  socket.emit('newMessage', data, (response) => {
    console.log(response.status);
  });
};

export default sendMessage;
