/* YouTube API Client */

const YouTubeAPI = {
  apiKey: window.YOUTUBE_API_KEY || '',
  channelId: window.YOUTUBE_CHANNEL_ID || 'UCB_-_uX-dHkBDi6j9ycN3gg',

  async fetchLatestVideos() {
    if (!this.apiKey) {
      console.warn('YouTube API key not configured');
      return [];
    }

    const cached = window.cacheManager?.get('youtube_videos');
    if (cached) return cached;

    try {
      const url = new URL('https://www.googleapis.com/youtube/v3/search');
      url.searchParams.append('channelId', this.channelId);
      url.searchParams.append('part', 'snippet');
      url.searchParams.append('order', 'date');
      url.searchParams.append('maxResults', '5');
      url.searchParams.append('key', this.apiKey);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const videos = (data.items || []).map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        published: new Date(item.snippet.publishedAt).toLocaleDateString(),
        url: `https://youtube.com/watch?v=${item.id.videoId}`,
        icon: 'youtube'
      }));

      window.cacheManager?.set('youtube_videos', videos);
      return videos;
    } catch (error) {
      console.error('YouTube API error:', error);
      return [];
    }
  },

  setApiKey(key) {
    this.apiKey = key;
    window.YOUTUBE_API_KEY = key;
  }
};

window.youtubeAPI = YouTubeAPI;
