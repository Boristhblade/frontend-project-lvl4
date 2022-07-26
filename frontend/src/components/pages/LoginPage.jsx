import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../LoginForm.jsx';
import logoImage from '../../images/loginPageLogo.jpg';

function LoginPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={logoImage} className="rounded-circle" alt={t('login.header')} />
                  </div>
                  <LoginForm />
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{t('login.newToChat')} </span>
                    <a href="/signup">{t('login.signup')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </>
  );
}

export default LoginPage;
