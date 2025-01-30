// client/src/components/MainContent.jsx

import React from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Box, Button, Card, CardContent, Grid } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import SubredditAnalyzer from './SubredditAnalyzer';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

function MainContent({ toggleMode, currentMode }) {
  return (
    <>
      {/* AppBar with Logo and Navigation */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Redd-Into-It
            </Link>
          </Typography>
          {/* Navigation Links */}
          <Button component={RouterLink} to="/about" color="inherit" sx={{ mr: 2 }}>
            About
          </Button>
          {/* Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleMode}>
            {currentMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          padding: '2rem',
          textAlign: 'center',
          mt: 4,
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Redd-Into-It
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Discover the best times to post on your favorite subreddits and maximize your engagement.
        </Typography>
      </Box>

      {/* Main Analyzer Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <SubredditAnalyzer />
      </Container>
    </>
  );
}

export default MainContent;
