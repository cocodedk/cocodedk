/* Activity Card Component */

function createActivityCard(activityItem) {
  const card = document.createElement('div');
  card.className = 'activity-card';
  card.setAttribute('role', 'article');

  const meta = activityItem.meta ? `• ${activityItem.meta}` : '';
  const link = activityItem.url ? `<a href="${activityItem.url}" target="_blank" rel="noopener" class="activity-card__link">View →</a>` : '';

  card.innerHTML = `
    <div class="activity-card__header">
      <span class="activity-card__icon">${activityItem.icon || '📌'}</span>
      <span class="activity-card__platform">${activityItem.platform || 'Activity'}</span>
    </div>
    <h3 class="activity-card__title">${activityItem.title}</h3>
    <p class="activity-card__description">${activityItem.description}</p>
    <div class="activity-card__meta">
      <span>${activityItem.date} ${meta}</span>
      ${link}
    </div>
  `;

  return card;
}

async function renderActivityFeed() {
  const container = document.getElementById('activity-feed-container');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-tertiary);">Loading activities...</div>';

  try {
    const [githubRepos, youtubeVideos, linkedinActivity] = await Promise.all([
      window.githubAPI?.fetchRepos() || Promise.resolve([]),
      window.youtubeAPI?.fetchLatestVideos() || Promise.resolve([]),
      window.linkedInHandler?.fetchActivity() || Promise.resolve([])
    ]);

    const allActivities = [
      ...(githubRepos || []).map(r => ({ ...r, platform: 'GitHub' })),
      ...(youtubeVideos || []).map(v => ({ ...v, platform: 'YouTube' })),
      ...(linkedinActivity || []).map(l => ({ ...l, platform: 'LinkedIn' }))
    ];

    container.innerHTML = '';

    if (allActivities.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-tertiary);">No activities found</div>';
      return;
    }

    allActivities.slice(0, 9).forEach((activity, index) => {
      const card = createActivityCard(activity);
      card.style.animationDelay = `${index * 100}ms`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Activity render error:', error);
    container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--accent-coral);">Error loading activities</div>';
  }
}

window.activityFeed = {
  render: renderActivityFeed,
  createCard: createActivityCard
};
