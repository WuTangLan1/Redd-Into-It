// client/src/components/SubredditAnalyzer.jsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';
import AnalysisCard from './AnalysisCard';
import { useDebounce } from '../hooks/useDebounce';
import timezones from '../data/timezones'; // Create a list of timezones

function SubredditAnalyzer() {
  const [subreddit, setSubreddit] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    if (!subreddit.trim()) {
      setError('Please enter a subreddit name.');
      return;
    }
    if (!/^[A-Za-z0-9_]{3,21}$/.test(subreddit.trim())) {
      setError('Invalid subreddit name. Subreddits must be 3-21 characters and can contain letters, numbers, and underscores.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysisData(null);

    try {
      const response = await axios.get(`/subreddit/${subreddit}/analysis`, {
        params: { timezone },
      });
      setAnalysisData(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Enter Subreddit"
            variant="outlined"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder="e.g., programming"
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <InputLabel id="timezone-label">Timezone</InputLabel>
            <Select
              labelId="timezone-label"
              id="timezone-select"
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </Grid>
      </Grid>
      {analysisData && <AnalysisCard data={analysisData} />}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SubredditAnalyzer;
