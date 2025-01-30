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
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

/**
 * Styled Components
 */

// Styled Card for enhanced responsiveness and styling
const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  boxShadow: theme.shadows[5],
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

// Header Section Styling
const HeaderGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Trend Chip Styling
const TrendChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
}));

// Optimal Hours Container
const OptimalHoursContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

// Comparative Analysis Container
const ComparativeAnalysisContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

// Chart Container with responsive height
const ChartContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '100%',
  height: 300,
  [theme.breakpoints.down('sm')]: {
    height: 250,
  },
}));

/**
 * AnalysisCard Component
 * Displays the analysis results for a subreddit, including optimal posting times and a visual chart.
 *
 * Props:
 * - data: Object containing analysis data.
 *   - subreddit: string
 *   - timezone: string
 *   - hourly_post_counts: array of 24 integers
 *   - optimal_hours: array of integers (hours with max posts)
 *   - max_post_count: integer
 *   - previous_analysis: (optional) object containing previous max_post_count
 */
function AnalysisCard({ data }) {
  const {
    subreddit,
    timezone,
    optimal_hours,
    max_post_count,
    hourly_post_counts,
    previous_analysis,
  } = data;

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

  // Function to return the appropriate trend icon
  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUpIcon color="success" aria-label="Increasing Trend" />;
      case 'decreasing':
        return <TrendingDownIcon color="error" aria-label="Decreasing Trend" />;
      default:
        return <AccessTimeIcon color="action" aria-label="Stable Trend" />;
    }
  };

  // Responsive design hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledCard>
      <CardContent>
        {/* Header Section */}
        <HeaderGrid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="div" gutterBottom>
              Subreddit: {subreddit}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Timezone: {timezone}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              alignItems: 'center',
            }}
          >
            <Tooltip title={`Current trend: ${trend}`} arrow>
              <TrendChip
                icon={getTrendIcon()}
                label={`Trend: ${trend.charAt(0).toUpperCase() + trend.slice(1)}`}
                color={
                  trend === 'increasing'
                    ? 'success'
                    : trend === 'decreasing'
                    ? 'error'
                    : 'default'
                }
              />
            </Tooltip>
          </Grid>
        </HeaderGrid>

        {/* Optimal Posting Hours */}
        <Box>
          <Typography variant="body1" gutterBottom>
            Optimal Posting Hour{optimal_hours.length > 1 ? 's' : ''}: {optimal_hours.join(', ')}{' '}
            {optimal_hours.length > 1 ? 'each with' : 'with'} {max_post_count} post
            {max_post_count > 1 ? 's' : ''}
          </Typography>
          <OptimalHoursContainer>
            {optimal_hours.map((hour) => (
              <TimeChip key={hour} hour={hour} />
            ))}
          </OptimalHoursContainer>
        </Box>

        {/* Comparative Analysis */}
        {previous_analysis && (
          <ComparativeAnalysisContainer>
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
          </ComparativeAnalysisContainer>
        )}

        {/* Hourly Post Activity Chart */}
        <ChartContainer>
          <Typography variant="h6" gutterBottom>
            Hourly Post Activity
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataForChart}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: isSmallScreen ? 60 : 30, // Increased bottom margin for rotated labels
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: isSmallScreen ? 10 : 14 }}
                angle={isSmallScreen ? -45 : 0}
                textAnchor={isSmallScreen ? 'end' : 'middle'}
                height={isSmallScreen ? 60 : 30} // Increased height for rotated labels
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: isSmallScreen ? 10 : 14 }}
              />
              <RechartsTooltip />
              {!isSmallScreen && <Legend verticalAlign="top" height={36} />}
              <Bar dataKey="posts" fill="#ff4500" name="Number of Posts">
                <LabelList dataKey="posts" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </StyledCard>
  );
}

export default AnalysisCard;
