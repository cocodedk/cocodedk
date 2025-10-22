/* LinkedIn Activity Handler */

const LinkedInHandler = {
  profileUrl: 'https://www.linkedin.com/in/babakbandpey/',

  async fetchActivity() {
    const cached = window.cacheManager?.get('linkedin_activity');
    if (cached) return cached;

    try {
      const activity = await this.getManualActivity();
      window.cacheManager?.set('linkedin_activity', activity);
      return activity;
    } catch (error) {
      console.error('LinkedIn fetch error:', error);
      return this.getDefaultActivity();
    }
  },

  async getManualActivity() {
    return [
      {
        id: 'linkedin-1',
        title: 'IT Consultant | Python Developer',
        description: 'Specializing in custom software development and cybersecurity',
        date: new Date().toLocaleDateString(),
        url: this.profileUrl,
        icon: 'linkedin'
      },
      {
        id: 'linkedin-2',
        title: 'Software Development Services',
        description: 'Django, React, Neo4j expertise',
        date: new Date().toLocaleDateString(),
        url: this.profileUrl,
        icon: 'linkedin'
      },
      {
        id: 'linkedin-3',
        title: 'Cybersecurity Compliance',
        description: 'CIS18, DORA, NIS2, ISO27000 frameworks',
        date: new Date().toLocaleDateString(),
        url: this.profileUrl,
        icon: 'linkedin'
      }
    ];
  },

  getDefaultActivity() {
    return [
      {
        id: 'linkedin-default',
        title: 'LinkedIn Profile',
        description: 'View profile on LinkedIn',
        date: new Date().toLocaleDateString(),
        url: this.profileUrl,
        icon: 'linkedin'
      }
    ];
  }
};

window.linkedInHandler = LinkedInHandler;
