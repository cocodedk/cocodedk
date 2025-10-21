#!/bin/bash

# Phase 4: Activity Feeds Implementation Script

set -e  # Exit on error

cd /home/bba/0-projects/cocodedk

echo "🚀 Phase 4: Activity Feeds Implementation"
echo "=========================================="

# Step 1: Update index.html to add activity feed CSS, scripts, and section
echo "1. Updating index.html..."

# Add activity-feed.css link after service-cards.css
sed -i '/<link rel="stylesheet" href="css\/service-cards.css/a\  <link rel="stylesheet" href="css\/activity-feed.css?v=1.0.0">' index.html

# Add activity feed scripts after service-card.js
sed -i '/<script src="js\/components\/service-card.js/a\  <!-- Activity Feed -->\n  <script src="js\/utils\/cache.js?v=1.0.0"><\/script>\n  <script src="js\/api\/github.js?v=1.0.0"><\/script>\n  <script src="js\/api\/youtube.js?v=1.0.0"><\/script>\n  <script src="js\/api\/linkedin.js?v=1.0.0"><\/script>\n  <script src="js\/components\/activity-card.js?v=1.0.0"><\/script>' index.html

# Add activity feed section after service cards section
sed -i '/<\/section>.*service-cards/a\  <!-- Activity Feed Section -->\n  <section class="activity-feed-section">\n    <h2 class="activity-feed-title">Latest Activity</h2>\n    <div class="activity-feed-grid" id="activity-feed-container"></div>\n  </section>' index.html

echo "✓ index.html updated"

# Step 2: Update main.js to initialize activity feed
echo "2. Updating main.js..."

# Add activity feed initialization after service cards
sed -i '/window.serviceCards.render/a\  // Initialize activity feed\n  if (window.activityFeed) {\n    window.activityFeed.render();\n  }' /home/bba/0-projects/cocodedk/js/main.js

echo "✓ main.js updated"

# Step 3: Create directories if they don't exist
echo "3. Creating directory structure..."
mkdir -p js/utils
mkdir -p js/api
echo "✓ Directories created"

# Step 4: Git add and commit
echo "4. Committing changes..."
git add -A
git commit -m "feat: add activity feeds integration (GitHub, YouTube, LinkedIn)"

echo ""
echo "✅ Phase 4 Complete!"
echo "   - Cache manager: js/utils/cache.js"
echo "   - GitHub API: js/api/github.js"
echo "   - YouTube API: js/api/youtube.js"
echo "   - LinkedIn Handler: js/api/linkedin.js"
echo "   - Activity Feed UI: css/activity-feed.css + js/components/activity-card.js"
echo "   - HTML & JS integrated"
echo ""
echo "📝 TODO: Configure YouTube API key"
echo "   window.YOUTUBE_API_KEY = 'your-api-key'"
