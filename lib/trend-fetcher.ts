import axios from 'axios';

export interface TrendData {
  source: string;
  topic: string;
  description?: string;
  viralityScore: number;
  url?: string;
  metadata?: any;
  relevanceScore?: number;
  totalScore?: number;
}

// Helper to calculate relevance score
export function calculateRelevanceScore(
  topic: string,
  description: string | undefined,
  userKeywords: string[]
): number {
  const text = `${topic} ${description || ''}`.toLowerCase();
  let score = 0;
  let matchCount = 0;

  for (const keyword of userKeywords) {
    if (text.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  }

  // Score is percentage of keywords matched, scaled to 0-100
  score = Math.min(100, Math.round((matchCount / userKeywords.length) * 100));
  
  // Bonus points for multiple keyword matches in same trend
  if (matchCount > 1) {
    score = Math.min(100, score + (matchCount * 5));
  }

  return score;
}

// Fetch Google Trends (simplified - would need actual API or scraping)
export async function fetchGoogleTrends(keywords: string[]): Promise<TrendData[]> {
  // This is a placeholder - in production you'd use:
  // 1. Google Trends API (unofficial npm packages available)
  // 2. SerpAPI for Google Trends
  // 3. Web scraping with Puppeteer
  
  // For now, returning mock data structure
  return [];
}

// Fetch Twitter/X Trends
export async function fetchTwitterTrends(apiKey?: string): Promise<TrendData[]> {
  // Would use Twitter API v2 with bearer token
  // GET https://api.twitter.com/2/trends/place
  
  // Placeholder - requires Twitter API key
  if (!apiKey) {
    return [];
  }

  try {
    // Example structure (would need actual API implementation)
    const trends: TrendData[] = [];
    return trends;
  } catch (error) {
    console.error('Twitter trends fetch error:', error);
    return [];
  }
}

// Fetch Reddit Trends
export async function fetchRedditTrends(subreddits: string[] = ['all']): Promise<TrendData[]> {
  const trends: TrendData[] = [];

  try {
    for (const subreddit of subreddits) {
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=25`,
        {
          headers: {
            'User-Agent': 'AI-Trend-Traffic-Hunter/1.0'
          }
        }
      );

      const posts = response.data?.data?.children || [];
      
      for (const post of posts) {
        const data = post.data;
        
        // Calculate virality score based on upvotes and comments
        const viralityScore = Math.min(
          100,
          Math.round((data.ups / 1000) * 30 + (data.num_comments / 100) * 20)
        );

        trends.push({
          source: 'reddit',
          topic: data.title,
          description: data.selftext?.substring(0, 200),
          viralityScore,
          url: `https://reddit.com${data.permalink}`,
          metadata: {
            subreddit: data.subreddit,
            upvotes: data.ups,
            comments: data.num_comments,
            author: data.author
          }
        });
      }
    }
  } catch (error) {
    console.error('Reddit trends fetch error:', error);
  }

  return trends.filter(t => t.viralityScore > 10);
}

// Fetch TikTok Trends (using search/hashtag approach)
export async function fetchTikTokTrends(): Promise<TrendData[]> {
  // TikTok doesn't have an official public API for trends
  // Would need to use:
  // 1. TikTok Research API (requires approval)
  // 2. Third-party services like Apify
  // 3. Web scraping
  
  // Placeholder
  return [];
}

// Main aggregator function
export async function fetchAllTrends(
  userKeywords: string[],
  options: {
    twitterApiKey?: string;
    subreddits?: string[];
  } = {}
): Promise<TrendData[]> {
  const allTrends: TrendData[] = [];

  // Fetch from all sources
  const [redditTrends, twitterTrends, googleTrends, tiktokTrends] = await Promise.all([
    fetchRedditTrends(options.subreddits),
    fetchTwitterTrends(options.twitterApiKey),
    fetchGoogleTrends(userKeywords),
    fetchTikTokTrends()
  ]);

  allTrends.push(...redditTrends, ...twitterTrends, ...googleTrends, ...tiktokTrends);

  // Calculate relevance scores
  const scoredTrends = allTrends.map(trend => ({
    ...trend,
    relevanceScore: calculateRelevanceScore(
      trend.topic,
      trend.description,
      userKeywords
    ),
    totalScore: 0 // Will be calculated as average
  }));

  // Calculate total score (average of virality and relevance)
  scoredTrends.forEach(trend => {
    trend.totalScore = Math.round((trend.viralityScore + trend.relevanceScore) / 2);
  });

  // Sort by total score
  return scoredTrends.sort((a, b) => b.totalScore - a.totalScore);
}
