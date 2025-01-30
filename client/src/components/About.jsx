// client/src/components/About.jsx

import React from 'react';
import { Typography, Container, Box, Grid, Card, CardContent, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function About() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Introduction */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          About Redd-Into-It
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Empowering Redditors with Data-Driven Posting Strategies
        </Typography>
      </Box>

      {/* Description and Image Section */}
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
      </Grid>

      {/* Features Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <InfoIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comprehensive Analysis
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Analyze up to 1000 recent posts to determine peak activity hours.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <AssessmentIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interactive Charts
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Visualize posting trends with dynamic and responsive graphs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', padding: 2 }}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User-Friendly Interface
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easy-to-use platform with autocomplete search and theme customization.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}

export default About;
