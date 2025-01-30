// client/src/components/About.jsx

import React from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { styled } from '@mui/material/styles';
import Logo from '../assets/redd-into-it-logo.png'; // Importing the logo image

/**
 * Styled Components
 */

// Styled Paper for the introduction section
const IntroductionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
}));

// Styled Typography for section titles
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  textAlign: 'center',
}));

// Styled Card for features
const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

// Styled Logo Image for the About page
const AboutLogo = styled('img')(({ theme }) => ({
  height: '60px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '40px',
    marginBottom: theme.spacing(1),
  },
}));

/**
 * About Component
 * Provides information about the Redd-Into-It application.
 */
function About() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Introduction Section */}
      <IntroductionPaper>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <AboutLogo src={Logo} alt="Redd-Into-It Logo" />
          <Typography variant="h3" gutterBottom>
            About Redd-Into-It
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Empowering Redditors with Data-Driven Posting Strategies
          </Typography>
        </Box>

        {/* Description Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Redd-Into-It is a powerful tool designed to help Reddit users identify the optimal times to post on their favorite subreddits. By analyzing recent activity patterns and engagement metrics, our platform provides insights that maximize the visibility and interaction of your posts.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're a content creator, marketer, or casual user, understanding when a subreddit is most active can significantly enhance your Reddit experience. Redd-Into-It simplifies this process by delivering actionable data in an easy-to-understand format.
            </Typography>
          </Grid>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={Logo}
              alt="Redd-Into-It Illustration"
              sx={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </IntroductionPaper>

      {/* Features Section */}
      <Box sx={{ mt: 6 }}>
        <SectionTitle variant="h4" gutterBottom>
          Features
        </SectionTitle>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <InfoIcon color="primary" sx={{ fontSize: 60 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comprehensive Analysis
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Analyze up to 1000 recent posts to determine peak activity hours.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <AssessmentIcon color="primary" sx={{ fontSize: 60 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interactive Charts
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Visualize posting trends with dynamic and responsive graphs.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <SupportAgentIcon color="primary" sx={{ fontSize: 60 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User-Friendly Interface
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easy-to-use platform with autocomplete search and theme customization.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}

export default About;
