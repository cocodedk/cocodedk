/* Activity Card Component */

function createActivityCard(activityItem) {
  const card = document.createElement('div');
  card.className = 'activity-card';
  card.setAttribute('role', 'article');

  const { title, description, date, url, homepage, icon, meta, platform, stars, language } = activityItem;

  const githubLink = url ? `<a href="${url}" target="_blank" rel="noopener" class="activity-card__link">GitHub</a>` : '';
  const demoLink = homepage ? `<a href="${homepage}" target="_blank" rel="noopener" class="activity-card__link activity-card__link--demo">Live Demo</a>` : '';

  const iconClass = icon ? `activity-card__icon activity-card__icon--${icon}` : 'activity-card__icon activity-card__icon--default';

  card.innerHTML = `
    <div class="activity-card__header">
      <img src="images/hexagon-icon.svg" class="${iconClass}" aria-hidden="true" alt="">
      <span class="activity-card__platform">${platform || 'Activity'}</span>
    </div>
    <h3 class="activity-card__title">${title}</h3>
    <p class="activity-card__description">${description}</p>
    <div class="activity-card__meta">
      ${language ? `<span><i class="fas fa-code"></i> ${language}</span>` : ''}
      ${stars > 0 ? `<span><i class="fas fa-star"></i> ${stars}</span>` : ''}
      <span><i class="fas fa-calendar-alt"></i> ${date}</span>
    </div>
    <div class="activity-card__footer">
      ${githubLink}
      ${demoLink}
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
      ...(githubRepos || []).map(r => ({
        title: r.name || r.title,
        description: r.description,
        date: r.updated || r.date,
        url: r.url,
        homepage: r.homepage,
        icon: r.icon,
        stars: r.stars,
        language: r.language,
        platform: 'GitHub'
      })),
      ...(youtubeVideos || []).map(v => ({
        title: v.title,
        description: v.description,
        date: v.date,
        url: v.url,
        icon: v.icon,
        meta: v.views ? `👁 ${v.views}` : '',
        platform: 'YouTube'
      })),
      ...(linkedinActivity || []).map(l => ({
        title: l.title,
        description: l.description,
        date: l.date,
        url: l.url,
        icon: l.icon,
        meta: l.meta || '',
        platform: 'LinkedIn'
      }))
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
