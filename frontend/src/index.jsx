import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import './index.css';
import init from './init.jsx';
import 'react-toastify/dist/ReactToastify.css';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init(socket);
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
