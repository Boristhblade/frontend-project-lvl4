/* eslint-disable react/jsx-no-constructed-context-values, react/prop-types */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import './App.css';
import Forbidden from './components/pages/404.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import AuthContext from './context/AuthContext.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/" element={<div />} />
          <Route path="*" element={<Forbidden />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
