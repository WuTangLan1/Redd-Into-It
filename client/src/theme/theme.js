// client/src/theme/theme.js

import { createTheme } from '@mui/material/styles';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff4500', // Reddit's orange
      },
      secondary: {
        main: '#00ff00',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#242424',
        paper: mode === 'light' ? '#ffffff' : '#333333',
      },
    },
    typography: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
    },
  });

export default getTheme;
