// client\src\api\subredditService.js

import axios from './axiosConfig';

export const searchSubreddits = async (query) => {
  try {
    console.log("Making API call to subreddit search:", query);
    console.log(import.meta.env.VITE_API_BASE_URL)

    const response = await axios.get(`/subreddit/search`, { params: { q: query } });
    console.log("API Response:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Search Subreddit Error:", error.response?.data || error.message);
    throw error.response?.data?.error || 'An unexpected error occurred.';
  }
};
