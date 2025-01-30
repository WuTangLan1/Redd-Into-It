// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme/theme';

// Retrieve the initial theme mode from localStorage or default to 'light'
const savedMode = localStorage.getItem('themeMode') || 'light';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={getTheme(savedMode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
