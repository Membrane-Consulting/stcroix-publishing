export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
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