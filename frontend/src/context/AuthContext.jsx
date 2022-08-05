import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { username } = JSON.parse(localStorage.getItem('userId')) ?? '';
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };
  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, username, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthContext };
