// client/src/components/MainContent.jsx

import React from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import SubredditAnalyzer from './SubredditAnalyzer';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

function MainContent({ toggleMode, currentMode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Redd-Into-It
            </Link>
          </Typography>
          <Link component={RouterLink} to="/about" color="inherit" underline="none" sx={{ mr: 2 }}>
            About
          </Link>
          <IconButton color="inherit" onClick={toggleMode}>
            {currentMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <SubredditAnalyzer />
      </Container>
    </>
  );
}

export default MainContent;
