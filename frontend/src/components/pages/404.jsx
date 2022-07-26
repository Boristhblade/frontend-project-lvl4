import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Forbidden() {
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {t('notFound.header')}
        </p>
        <p className="lead">
          {t('notFound.message')}
        </p>
        <Link to="/" className="btn btn-primary">
          {t('notFound.linkText')}
        </Link>
      </div>
    </div>
  );
}

export default Forbidden;
