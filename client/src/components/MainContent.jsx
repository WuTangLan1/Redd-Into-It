// client/src/components/MainContent.jsx

import React, { useRef } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Grid,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import SubredditAnalyzer from './SubredditAnalyzer';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../assets/redd-into-it-logo.png';
import helpfulMonkey1 from '../assets/helpfulmonkey_1.png';
import helpfulMonkey2 from '../assets/helpfulmonkey_2.png';
import helpfulMonkey3 from '../assets/helpfulmonkey_3.png';
import helpfulMonkey4 from '../assets/helpfulmonkey_4.png';
import helpfulMonkeyBestTime from '../assets/helpfulmonkey_besttime.png';
import helpfulMonkeyDataViz from '../assets/helpfulmonkey_datavizualizations.png';
import helpfulMonkeySearch from '../assets/helpfulmonkey_searchsubreddits.png';

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
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '35px',
    marginRight: theme.spacing(1),
  },
}));

// Hero Section Styling with background gradient
const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 1),
  },
}));

// Enhanced Typography for Hero Title
const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

// Enhanced Typography for Hero Subtitle
const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

// Features Section Styling
const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

// Feature Item Styling
const FeatureItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

// Call-to-Action Button Styling
const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  borderRadius: theme.spacing(1),
}));

// How It Works Section Styling
const HowItWorksSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

// Step Item Styling
const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'background-color 0.3s ease',
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

// Monkey Image Styling
const MonkeyImage = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
}));

// Additional Image Styling for Features
const FeatureImage = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  marginBottom: theme.spacing(2),
}));

function MainContent({ toggleMode, currentMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Reference to the SubredditAnalyzer component
  const analyzerRef = useRef(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to scroll to SubredditAnalyzer smoothly
  const scrollToAnalyzer = () => {
    if (analyzerRef.current) {
      analyzerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <LogoImage src={Logo} alt="Redd-Into-It Logo" />
      <Typography variant="h6" sx={{ my: 2 }}>
        Redd-Into-It
      </Typography>
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar with Logo and Navigation */}
      <StyledAppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoImage src={Logo} alt="Redd-Into-It Logo" />
          {!isMobile && (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                  Redd-Into-It
                </Link>
              </Typography>
            </>
          )}
          {/* Theme Toggle Button with Tooltip */}
          <Tooltip title="Toggle light/dark mode">
            <IconButton color="inherit" onClick={toggleMode}>
              {currentMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <HeroSection>
        <HeroTitle variant="h3" gutterBottom>
          Welcome to Redd-Into-It
        </HeroTitle>
        <HeroSubtitle variant="h6">
          Discover the best times to post on your favorite subreddits and maximize your engagement.
        </HeroSubtitle>
        <CTAButton
          variant="contained"
          color="tertiary"
          size="large"
          onClick={scrollToAnalyzer}
        >
          Get Started
        </CTAButton>
      </HeroSection>

      {/* Features Section */}
      <FeatureSection>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Feature 1: Search Subreddits */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <FeatureImage
                  src={helpfulMonkeySearch}
                  alt="Search Subreddits Feature"
                  loading="lazy"
                />
                <Typography variant="h6" gutterBottom>
                  Search Subreddits
                </Typography>
                <Typography variant="body1">
                  Easily search and discover subreddits to analyze their optimal posting times.
                </Typography>
              </FeatureItem>
            </Grid>
            {/* Feature 2: Optimal Times */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <FeatureImage
                  src={helpfulMonkeyBestTime}
                  alt="Optimal Times Feature"
                  loading="lazy"
                />
                <Typography variant="h6" gutterBottom>
                  Optimal Times
                </Typography>
                <Typography variant="body1">
                  Get insights into the best times to post for maximum engagement based on data analysis.
                </Typography>
              </FeatureItem>
            </Grid>
            {/* Feature 3: Data Visualization */}
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <FeatureImage
                  src={helpfulMonkeyDataViz}
                  alt="Data Visualization Feature"
                  loading="lazy"
                />
                <Typography variant="h6" gutterBottom>
                  Data Visualization
                </Typography>
                <Typography variant="body1">
                  Visualize posting activity with interactive charts and graphs to make informed decisions.
                </Typography>
              </FeatureItem>
            </Grid>
          </Grid>
        </Container>
      </FeatureSection>

      {/* How It Works Section */}
      <HowItWorksSection>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {/* Step 1 */}
            <Grid item xs={12} md={6}>
              <StepItem>
                <MonkeyImage src={helpfulMonkey1} alt="Step 1: Search Subreddit" loading="lazy" />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Step 1: Search Subreddit
                  </Typography>
                  <Typography variant="body1">
                    Enter the name of any subreddit to begin analyzing its posting patterns.
                  </Typography>
                </Box>
              </StepItem>
            </Grid>
            {/* Step 2 */}
            <Grid item xs={12} md={6}>
              <StepItem>
                <MonkeyImage src={helpfulMonkey2} alt="Step 2: Analyze Data" loading="lazy" />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Step 2: Analyze Data
                  </Typography>
                  <Typography variant="body1">
                    Our tool fetches the latest posts and analyzes them to determine peak engagement times.
                  </Typography>
                </Box>
              </StepItem>
            </Grid>
            {/* Step 3 */}
            <Grid item xs={12} md={6}>
              <StepItem>
                <MonkeyImage src={helpfulMonkey3} alt="Step 3: Optimize Your Posts" loading="lazy" />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Step 3: Optimize Your Posts
                  </Typography>
                  <Typography variant="body1">
                    Use the insights to schedule your posts when they're most likely to be seen and interacted with.
                  </Typography>
                </Box>
              </StepItem>
            </Grid>
            {/* Step 4 */}
            <Grid item xs={12} md={6}>
              <StepItem>
                <MonkeyImage src={helpfulMonkey4} alt="Step 4: Track Performance" loading="lazy" />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Step 4: Track Performance
                  </Typography>
                  <Typography variant="body1">
                    Monitor how your posts perform over time and adjust your strategy accordingly.
                  </Typography>
                </Box>
              </StepItem>
            </Grid>
          </Grid>
        </Container>
      </HowItWorksSection>


      {/* Main Analyzer Section */}
      <Container maxWidth="xl" sx={{pb: 20, mt: 4, mb: 4 }} ref={analyzerRef}>
        <SubredditAnalyzer id="analyze" />
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'common.white',
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body1">
                &copy; {new Date().getFullYear()} Redd-Into-It. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default MainContent;
