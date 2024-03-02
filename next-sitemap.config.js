module.exports = {
  siteUrl: process.env.HOST_SITE_URL || 'https://laillusions.com',
  generateRobotsTxt: true,
  // sitemapSize: 7000,
  rewrites: async () => [
    {
      source: '/serve.xml',
      destination: '/dynamic-sitemap',
    },
  ],
}