import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, batch } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth.jsx';
import getAuthHeader from '../../utils.js';
import ModalProvider from '../../context/ModalContext.jsx';
import { addChannels } from '../../slices/channelsSlice.js';
import { addMessages } from '../../slices/messagesSlice.js';
import { setChannel } from '../../slices/currentChannelSlice.js';
import ChatWindow from '../ChatWindow.jsx';
import Navbar from '../Navbar.jsx';
import getModal from '../modals/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component type={modalInfo.type} id={modalInfo.id} onHide={hideModal} />;
};

function MainPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, id = null) => setModalInfo({ type, id });
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
          dispatch(setChannel({ id: data.currentChannelId }));
          dispatch(addChannels(data.channels));
          dispatch(addMessages(data.messages));
        });
      });
  }, [auth.loggedIn]);
  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Navbar />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <ModalProvider handler={showModal}>
                <ChatWindow />
              </ModalProvider>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
}

export default MainPage;
