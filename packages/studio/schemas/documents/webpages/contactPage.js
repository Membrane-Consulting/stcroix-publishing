export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      description: 'Define what is indexed by Google & shown in Social Media Previews',
      type: 'seo',
    },
  ],
}