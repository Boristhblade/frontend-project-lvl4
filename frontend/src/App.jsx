/* eslint-disable react/jsx-no-constructed-context-values, react/prop-types */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Forbidden from './components/pages/404.jsx';
import MainPage from './components/pages/MainPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import SignupPage from './components/pages/SignupPage.jsx';
import AuthContext from './context/AuthContext.jsx';
import store from './slices/index.js';
import ChatAPIProvider from './context/ChatAPIContext.jsx';
import routes from './routes';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { username } = JSON.parse(localStorage.getItem('userId')) ?? '';
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, username,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const socket = io();

function App() {
  return (
    <Provider store={store}>
      <ChatAPIProvider socket={socket}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route exact path={routes.loginPage()} element={<LoginPage />} />
              <Route exact path={routes.signupPage()} element={<SignupPage />} />
              <Route exact path={routes.homePage()} element={<MainPage />} />
              <Route path={routes.notFoundPage()} element={<Forbidden />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ChatAPIProvider>
    </Provider>
  );
}

export default App;
