// client/src/components/MainContent.jsx

import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import SubredditAnalyzer from './SubredditAnalyzer';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../assets/redd-into-it-logo.png'; // Importing the logo image

/**
 * Styled Components
 */

// Styled AppBar to include logo and enhance layout
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

// Logo Image Styling
const LogoImage = styled('img')(({ theme }) => ({
  height: '40px',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    marginRight: theme.spacing(1),
  },
}));

// Hero Section Styling with background gradient
const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

// Enhanced Typography for Hero Title
const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

// Enhanced Typography for Hero Subtitle
const HeroSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

function MainContent({ toggleMode, currentMode }) {
  return (
    <>
      {/* AppBar with Logo and Navigation */}
      <StyledAppBar position="static" color="primary">
        <Toolbar>
          {/* Logo and App Title */}
          <LogoImage src={Logo} alt="Redd-Into-It Logo" />
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
      </StyledAppBar>

      {/* Hero Section */}
      <HeroSection>
        <HeroTitle variant="h3" gutterBottom>
          Welcome to Redd-Into-It
        </HeroTitle>
        <HeroSubtitle variant="h6">
          Discover the best times to post on your favorite subreddits and maximize your engagement.
        </HeroSubtitle>
      </HeroSection>

      {/* Main Analyzer Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <SubredditAnalyzer />
      </Container>
    </>
  );
}

export default MainContent;
