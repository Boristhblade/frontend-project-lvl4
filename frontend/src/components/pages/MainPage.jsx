import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, batch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.jsx';
import getAuthHeader from '../../utils.js';
import ModalProvider from '../../context/ModalContext.jsx';
import { addChannels } from '../../slices/channelsSlice.js';
import { addMessages } from '../../slices/messagesSlice.js';
import { setChannel } from '../../slices/currentChannelSlice.js';
import ChatWindow from '../ChatWindow.jsx';
import getModal from '../modals/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

function MainPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });
  const { t } = useTranslation();
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
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <button type="button" className="btn btn-primary" onClick={auth.logOut}>{t('logout')}</button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <ModalProvider handler={showModal}>
                <ChatWindow />
              </ModalProvider>
            </div>
          </div>
          <div className="Toastify" />
        </div>
      </div>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
}

export default MainPage;
