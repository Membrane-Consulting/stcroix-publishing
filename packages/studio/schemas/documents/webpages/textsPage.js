export default {
  name: 'textsPage',
  title: 'Texts Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'portableText',
      validation: Rule => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      description: 'Define what is indexed by Google & shown in Social Media Previews',
      type: 'seo',
    },
  ],
}