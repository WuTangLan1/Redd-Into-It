// client/src/components/About.jsx

import React from 'react';
import { Typography, Container } from '@mui/material';

function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Redd-Into-It
      </Typography>
      <Typography variant="body1">
        Redd-Into-It helps Reddit users determine the optimal times to post on their favorite subreddits by analyzing activity patterns and engagement metrics. By understanding when a subreddit is most active, users can maximize the visibility and engagement of their posts.
      </Typography>
    </Container>
  );
}

export default About;
