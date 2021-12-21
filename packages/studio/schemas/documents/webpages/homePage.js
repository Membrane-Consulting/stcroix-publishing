export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
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