/* GitHub Projects Card Component */

function createGitHubCard(repo) {
  const card = document.createElement('a');
  card.className = 'github-card';
  card.href = repo.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.setAttribute('role', 'article');

  const langClass = (repo.language || '').toLowerCase().replace(/[^a-z]/g, '');

  card.innerHTML = `
    <div class="github-card__header">
      <h3 class="github-card__name">${repo.name}</h3>
      ${repo.stars > 0 ? `<span class="github-card__stars"><i class="fas fa-star"></i> ${repo.stars}</span>` : ''}
    </div>
    <p class="github-card__desc">${repo.description}</p>
    <div class="github-card__footer">
      ${repo.language && repo.language !== 'N/A' ? `<span class="github-card__lang github-card__lang--${langClass}"><i class="fas fa-circle"></i> ${repo.language}</span>` : ''}
      <span class="github-card__date">${repo.updated}</span>
      ${repo.homepage ? `<span class="github-card__demo">Live</span>` : ''}
    </div>
  `;

  return card;
}

async function renderActivityFeed() {
  const container = document.getElementById('activity-feed-container');
  if (!container) return;

  container.innerHTML = '<div class="github-loading">Loading...</div>';

  try {
    const githubRepos = await (window.githubAPI?.fetchRepos() || Promise.resolve([]));

    container.innerHTML = '';

    if (!githubRepos || githubRepos.length === 0) {
      container.innerHTML = '<div class="github-loading">No projects found</div>';
      return;
    }

    githubRepos.slice(0, 12).forEach((repo, index) => {
      const card = createGitHubCard(repo);
      card.style.animationDelay = `${index * 50}ms`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('GitHub render error:', error);
    container.innerHTML = '<div class="github-loading">Error loading projects</div>';
  }
}

window.activityFeed = {
  render: renderActivityFeed,
  createCard: createGitHubCard
};
