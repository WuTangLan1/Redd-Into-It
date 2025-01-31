# server/app.py

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import praw
from dotenv import load_dotenv
from collections import defaultdict
from datetime import datetime
import pytz
from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://redd-into-it.vercel.app",  
            "http://localhost:3000" 
        ]
    }
})
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize PRAW with environment variables
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
    redirect_uri=os.getenv("REDDIT_REDIRECT_URI")
)

# Initialize Flask-Limiter for rate limiting
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
limiter.init_app(app)  

# Initialize Flask-Caching with simple cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend connected and Reddit API initialized!'}), 200

@app.route('/api/subreddit/search', methods=['GET'])
@limiter.limit("10 per minute") 
@cache.cached(timeout=300, query_string=True) 
def search_subreddits():
    """
    Searches for subreddits based on a query string.
    """
    try:
        query = request.args.get('q', '')
        if not query:
            logger.warning('Search query missing')
            return jsonify({'error': 'Query parameter "q" is required.'}), 400
        
        subreddits = reddit.subreddits.search(query, limit=10)  # Limit to top 10 results

        # Construct a list of subreddit names and titles
        results = [{'name': subreddit.display_name, 'title': subreddit.title} for subreddit in subreddits]

        logger.info(f"Search query '{query}' returned {len(results)} results")
        return jsonify({'results': results}), 200

    except Exception as e:
        logger.error(f"Error in search_subreddits: {e}")
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

@app.route('/api/subreddit/<string:subreddit_name>/analysis', methods=['GET'])
def analyze_subreddit(subreddit_name):
    """
    Analyzes the specified subreddit to determine the optimal posting times based on recent activity.
    """
    try:
        # Get timezone from query parameters; default to UTC if not provided
        timezone = request.args.get('timezone', 'UTC')

        # Validate timezone
        if timezone not in pytz.all_timezones:
            logger.warning(f"Invalid timezone provided: {timezone}")
            return jsonify({'error': 'Invalid timezone provided.'}), 400

        # Construct cache key
        cache_key = f"analysis:{subreddit_name}:{timezone}"
        cached_response = cache.get(cache_key)
        if cached_response:
            logger.info(f"Returning cached analysis for subreddit: {subreddit_name}, timezone: {timezone}")
            return jsonify(cached_response), 200

        logger.info(f"Analyzing subreddit: {subreddit_name} for timezone: {timezone}")

        # Access the subreddit
        subreddit = reddit.subreddit(subreddit_name)

        # Fetch the latest 1000 posts for analysis
        posts = subreddit.new(limit=1000)

        # Initialize a dictionary to count posts per hour
        hour_counts = defaultdict(int)

        for post in posts:
            # Convert UTC timestamp to datetime object
            post_time_utc = datetime.fromtimestamp(post.created_utc, pytz.utc)

            # Convert to user's local timezone
            local_timezone = pytz.timezone(timezone)
            post_time_local = post_time_utc.astimezone(local_timezone)

            # Extract the hour (0-23)
            hour = post_time_local.hour

            # Increment the count for this hour
            hour_counts[hour] += 1

        # If no posts were found
        if not hour_counts:
            logger.warning(f"No posts found in subreddit: {subreddit_name}")
            return jsonify({'error': 'No posts found in the specified subreddit.'}), 404

        # Prepare data for visualization
        hourly_post_counts = [hour_counts.get(hour, 0) for hour in range(24)]

        # Determine the maximum post count
        max_post_count = max(hourly_post_counts)

        # Identify all hours that have the maximum post count (handle ties)
        optimal_hours = [hour for hour, count in enumerate(hourly_post_counts) if count == max_post_count]

        # Construct the response
        response = {
            'subreddit': subreddit_name,
            'timezone': timezone,
            'hourly_post_counts': hourly_post_counts,
            'optimal_hours': optimal_hours,
            'max_post_count': max_post_count
        }

        # Manually cache the successful response
        cache.set(cache_key, response, timeout=300)

        logger.info(f"Analysis successful for subreddit: {subreddit_name}")
        return jsonify(response), 200

    except praw.exceptions.Redirect:
        logger.error(f"Subreddit not found: {subreddit_name}")
        return jsonify({'error': 'Subreddit not found.'}), 404
    except praw.exceptions.PRAWException as e:
        logger.error(f"Reddit API error: {e}")
        return jsonify({'error': f'Reddit API error: {str(e)}'}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
