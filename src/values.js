module.exports = {
  name: 'Reddit Reader',

  serviceWorker: {
    scope: '/uwc7-semi/'
  },

  reddit: {
    perPage: 25,
    sortBy: ['hot', 'new', 'top', 'controversial']
  }

};