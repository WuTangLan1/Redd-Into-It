// client\src\api\subredditService.js

import axios from './axiosConfig';

export const searchSubreddits = async (query) => {
  try {
    const response = await axios.get('/subreddit/search', {
      params: { q: query },
    });
    return response.data.results;
  } catch (error) {
    throw error.response?.data?.error || 'An unexpected error occurred.';
  }
};