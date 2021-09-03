module.exports = {
  eslint: {
    // I have already run lint before this step...
    ignoreDuringBuilds: true,
  },
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
};
