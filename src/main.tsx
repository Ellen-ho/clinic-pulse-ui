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

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <FiltersProvider>
            <App />
            <Toaster position="bottom-center" />
          </FiltersProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
