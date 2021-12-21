export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
    },
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'portableText',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      description: 'Define what is indexed by Google & shown in Social Media Previews',
      type: 'seo',
    },
  ],
}