export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fieldsets: [
      {
        name: 'seo',
        title: 'SEO',
        options: { collapsible: true, collapsed: true },
      },
      {
        name: 'legal',
        title: 'Public Legal Content',
        options: { collapsible: true, collapsed: true },
      },
  ],
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
      fieldset: 'seo'
    },
    {
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'portableText',
      fieldset: 'legal',
    },
    {
      name: 'termsOfService',
      title: 'Terms Of Service',
      type: 'portableText',
      fieldset: 'legal',
    },
  ],
}