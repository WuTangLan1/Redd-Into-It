// client/src/components/AnalysisCard.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TimeChip from './TimeChip';

function AnalysisCard({ data }) {
  const { subreddit, timezone, optimal_hours, max_post_count, hourly_post_counts } = data;

  const dataForChart = hourly_post_counts.map((count, hour) => ({
    hour: `${hour}:00`,
    posts: count,
  }));

  return (
    <Card sx={{ mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Subreddit: {subreddit}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Timezone: {timezone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Optimal Posting Hour{optimal_hours.length > 1 ? 's' : ''}: {optimal_hours.join(', ')} (with {max_post_count} posts)
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {optimal_hours.map((hour) => (
            <TimeChip key={hour} hour={hour} />
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Hourly Post Activity
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataForChart}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#ff4500" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AnalysisCard;
