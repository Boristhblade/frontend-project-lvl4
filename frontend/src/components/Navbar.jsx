import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

function LogoutBtn() {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <button type="button" className="btn btn-primary" onClick={auth.logOut}>
      {t('logout')}
    </button>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {t('chat')}
        </Link>
        {auth.loggedIn && <LogoutBtn />}
      </div>
    </nav>
  );
}
