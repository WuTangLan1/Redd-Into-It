// client/src/components/SubredditAnalyzer.jsx

import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Autocomplete,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import AnalysisCard from './AnalysisCard';
import { useDebounce } from '../hooks/useDebounce';
import timezones from '../data/timezones';
import { searchSubreddits } from '../api/subredditService';
import axios from '../api/axiosConfig';

function SubredditAnalyzer() {
  const [subreddit, setSubreddit] = useState(null); // Selected subreddit object
  const [inputValue, setInputValue] = useState(''); // User input value
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [loading, setLoading] = useState(false); // Loading state for analysis
  const [searchLoading, setSearchLoading] = useState(false); // Loading state for search
  const [error, setError] = useState(''); // Error message
  const [success, setSuccess] = useState(''); // Success message
  const [analysisData, setAnalysisData] = useState(null); // Analysis result
  const [options, setOptions] = useState([]); // Subreddit suggestions

  const debouncedInput = useDebounce(inputValue, 500); // 500ms debounce

  useEffect(() => {
    if (!debouncedInput || debouncedInput.trim() === '') {
      setOptions([]);
      return;
    }

    const fetchSubreddits = async () => {
      setSearchLoading(true);
      try {
        const results = await searchSubreddits(debouncedInput.trim());
        setOptions(results);
      } catch (errMsg) {
        setError(errMsg);
        console.error('Search Subreddit Error:', errMsg); // Log error
      } finally {
        setSearchLoading(false);
      }
    };

    fetchSubreddits();
  }, [debouncedInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    if (!subreddit || !subreddit.name) {
      setError('Please select a subreddit from the suggestions.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setAnalysisData(null);

    try {
      const response = await axios.get(`/subreddit/${subreddit.name}/analysis`, {
        params: { timezone },
      });
      console.log('Analysis Response:', response.data); // Log successful response
      setAnalysisData(response.data);
      setSuccess('Analysis completed successfully!');
    } catch (err) {
      console.error('Analyze Subreddit Error:', err); // Log error
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
    setSuccess('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 4,
        p: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Analyze Subreddit Posting Times
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {/* Subreddit Input */}
          <Grid item xs={12} md={5}>
            <Autocomplete
              value={subreddit}
              onChange={(event, newValue) => setSubreddit(newValue)}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              options={options}
              getOptionLabel={(option) => `${option.name} - ${option.title}`}
              loading={searchLoading}
              noOptionsText="No subreddits found"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Subreddit"
                  variant="outlined"
                  placeholder="e.g., programming"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Timezone Selection */}
          <Grid item xs={12} md={5}>
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

          {/* Analyze Button */}
          <Grid item xs={12} md={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{
                height: '56px',
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </Grid>
        </Grid>

        {/* Display Analysis Data */}
        {analysisData && <AnalysisCard data={analysisData} />}

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}

export default SubredditAnalyzer;
