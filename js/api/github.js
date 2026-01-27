/* GitHub API Client */

const GitHubAPI = {
  username: 'cocodedk',
  baseUrl: 'https://api.github.com',

  async fetchRepos() {
    const cached = window.cacheManager?.get('github_repos');
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=20`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const repos = await response.json();
      const formatted = repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        language: repo.language || 'N/A',
        updated: new Date(repo.updated_at).toLocaleDateString(),
        icon: 'github'
      }));

      window.cacheManager?.set('github_repos', formatted);
      return formatted;
    } catch (error) {
      console.error('GitHub API error:', error);
      return [];
    }
  },

  async fetchActivity() {
    const cached = window.cacheManager?.get('github_activity');
    if (cached) return cached;

    try {
      const url = `${this.baseUrl}/users/${this.username}/events/public?per_page=3`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const events = await response.json();
      return events;
    } catch (error) {
      console.error('GitHub Activity error:', error);
      return [];
    }
  }
};

window.githubAPI = GitHubAPI;
