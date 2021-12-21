export default {
  name: 'textbook',
  title: 'Text Book',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Text Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Sub Title',
      type: 'string',
    },
    {
      name: 'pubYear',
      title: 'Publication Year',
      type: 'string',
    },
    {
      name: 'exerpt',
      title: 'Exerpt',
      description: 'A short paragraph describing the text.',
      type: 'portableText',
      validation: Rule => Rule.required(),
    },
    {
      name: 'pdf',
      title: 'PDF File',
      type: 'file',
      validation: Rule => Rule.required(),
    },
    // {
    //   name: 'chapters',
    //   title: 'Chapters',
    //   type: 'array',
    //   of: [{type: 'chapter'}]
    // },
  ],
}