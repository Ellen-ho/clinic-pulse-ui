import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { FiltersProvider } from './context/FiltersProvider';
import { NotificationProvider } from './context/NotificationProvider';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <FiltersProvider>
            <NotificationProvider>
              <App />
              <Toaster position="bottom-center" />
            </NotificationProvider>
          </FiltersProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
