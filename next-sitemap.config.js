/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://notesin.com",   // Your live domain
  generateRobotsTxt: true,          // Also create robots.txt
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,

  // Add extra important pages manually
  additionalPaths: async (config) => [
    await config.transform(config, "/about"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/resume/form"),
    await config.transform(config, "/resume/templates"),
    await config.transform(config, "/quiz"),
    await config.transform(config, "/codelab"),

  ],
};
