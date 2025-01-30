// client/src/components/AnalysisCard.jsx

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LabelList,
} from 'recharts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimeChip from './TimeChip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function AnalysisCard({ data }) {
  const { subreddit, timezone, optimal_hours, max_post_count, hourly_post_counts, previous_analysis } = data;

  // Prepare data for the chart
  const dataForChart = hourly_post_counts.map((count, hour) => ({
    hour: `${hour}:00`,
    posts: count,
  }));

  // Determine trend based on previous analysis if available
  const trend = previous_analysis
    ? max_post_count > previous_analysis.max_post_count
      ? 'increasing'
      : max_post_count < previous_analysis.max_post_count
      ? 'decreasing'
      : 'stable'
    : 'stable';

  const trendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUpIcon color="success" />;
      case 'decreasing':
        return <TrendingDownIcon color="error" />;
      default:
        return <AccessTimeIcon color="action" />;
    }
  };

  return (
    <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Header Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Subreddit: {subreddit}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Timezone: {timezone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Tooltip title={`Current trend: ${trend}`}>
              <Chip
                icon={trendIcon()}
                label={`Trend: ${trend.charAt(0).toUpperCase() + trend.slice(1)}`}
                color={
                  trend === 'increasing'
                    ? 'success'
                    : trend === 'decreasing'
                    ? 'error'
                    : 'default'
                }
                sx={{ fontWeight: 'bold' }}
              />
            </Tooltip>
          </Grid>
        </Grid>

        {/* Optimal Posting Hours */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Optimal Posting Hour{optimal_hours.length > 1 ? 's' : ''}: {optimal_hours.join(', ')}{' '}
            {optimal_hours.length > 1 ? 'each with' : 'with'} {max_post_count} posts
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {optimal_hours.map((hour) => (
              <TimeChip key={hour} hour={hour} />
            ))}
          </Box>
        </Box>

        {/* Comparative Analysis */}
        {previous_analysis && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Comparative Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Previous Max Posts:</Typography>
                <Typography variant="body2">{previous_analysis.max_post_count}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Current Max Posts:</Typography>
                <Typography variant="body2">{max_post_count}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Hourly Post Activity Chart */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Hourly Post Activity
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataForChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis allowDecimals={false} />
              <RechartsTooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="posts" fill="#ff4500" name="Number of Posts">
                <LabelList dataKey="posts" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AnalysisCard;
