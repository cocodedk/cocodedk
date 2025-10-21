# Activity Feeds Integration

## Overview
Display latest activity from GitHub, YouTube, and LinkedIn on site.

## GitHub Integration
- **API**: GitHub REST API v3 (public, no auth required)
- **Endpoint**: `https://api.github.com/users/cocodedk/repos`
- **Data**: Recent repos, star count, descriptions
- **Cache**: 5 minutes
- **Display**: 3-5 latest repos with star badges
- **Format**: Repo name, description, star count, language

## YouTube Integration
- **API**: YouTube Data API v3 (requires API key)
- **Channel ID**: User to provide (from settings)
- **Endpoint**: List uploads from channel
- **Data**: Latest video uploads (title, thumbnail, date, view count)
- **Cache**: 5 minutes
- **Display**: 3-5 latest videos with thumbnails
- **Format**: Video title, thumbnail image, upload date

## LinkedIn Integration
- **Status**: Limited public API access
- **Options**:
  1. Manual updates via JSON config
  2. RSS feed parsing (if available)
  3. Profile scraping (ethical considerations)
- **Display**: Latest 2-3 posts/updates
- **Format**: Post text, date, engagement metrics (if available)

## Caching Strategy
- **localStorage** with timestamp
- **5-minute TTL** for GitHub/YouTube
- **Manual refresh** for LinkedIn
- **Graceful fallback** if API unavailable

## Error Handling
- Rate limit exceeded: Show cached data
- Network error: Show cached or friendly message
- Invalid API key: Show YouTube placeholder
- API down: Display "Activity unavailable" message

## Activity Card Format
```
[Icon] [Title/Name]
[Image/Badge]
[Description]
[Meta: date, count, etc]
[Link/CTA]
```

## Rate Limiting
- GitHub: 60 requests/hour (public)
- YouTube: 10,000 units/day
- Cache aggressively to minimize API calls
