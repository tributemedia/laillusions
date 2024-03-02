export const PATH_PAGE = {
  landing: '/',
  tickets: '/tickets',
  blog: {
    blog: '/blog',
    article: '/blog/article',
    view: (slug) => `/blog/${slug}`,
  },
  view: (slug) => `/${slug}`,
  museumOfIllusions: '/museum-of-illusions',
  upsideDownHouse: '/upside-down-house',
  giantsHouse: '/giants-house',
  smashIt: '/smash-it',
  
  schoolGroups: '/school-trips',
  events: '/birthdays-parties-events',
  experience: '/vip-experience',
  
  page404: '/404',
  privacyPolicy: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
  checkout: '/checkout'
};