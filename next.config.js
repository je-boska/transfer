const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'images.ctfassets.net',
      'videos.ctfassets.net',
      'downloads.ctfassets.net',
    ],
  },
};
