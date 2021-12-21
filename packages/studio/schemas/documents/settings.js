export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'globalSeo',
      title: 'Global SEO Settings',
      description: 'If SEO data is not provided for a page, this data will be used as a default.',
      type: 'seo',
    },
  ],
}