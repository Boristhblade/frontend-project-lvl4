import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, batch } from 'react-redux';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.jsx';
import getAuthHeader from '../../utils.js';
import { addChannels } from '../../slices/channelsSlice.js';
import { addMessages } from '../../slices/messagesSlice.js';
import ChatWindow from '../ChatWindow.jsx';

function MainPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const header = getAuthHeader();
    if (!userId) {
      navigate('/login');
      return;
    }
    auth.logIn();
    axios.get('/api/v1/data', { headers: header })
      .then(({ data }) => {
        batch(() => {
          dispatch(addChannels(data.channels));
          dispatch(addMessages(data.messages));
        });
      });
  }, [auth.loggedIn]);
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
              <button type="button" className="btn btn-primary" onClick={auth.logOut}>Выйти</button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <ChatWindow />
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
}

export default MainPage;
