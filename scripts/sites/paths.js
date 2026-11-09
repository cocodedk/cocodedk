// Where the catalogue's files live and what a card's picture is called. One place, so the collector,
// the renderer and the tests cannot disagree about a name.

// 640x336 is the 1200x630 share ratio at the size a card shows it, doubled for a dense screen.
export const PICTURE = { width: 640, height: 336 };

export const DATA = {
  catalogue: 'data/catalogue.json',
  sites: 'data/sites.json',
  partial: 'templates/partials/catalogue.html',
  dir: 'images/works',
};

export const picturePath = (entry) => `${DATA.dir}/${entry.id}.${entry.picture === 'house' ? 'svg' : 'webp'}`;
