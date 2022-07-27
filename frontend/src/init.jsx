import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import ru from './locales/ru.js';

const rollbarConfig = {
  accessToken: '530695a665874822bf14cdea7fd4e444',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
