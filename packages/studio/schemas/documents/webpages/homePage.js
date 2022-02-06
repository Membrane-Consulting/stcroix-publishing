export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero Section',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'featured',
      title: 'Featured Text Book',
      options: { collapsible: true, collapsed: true },
    }
  ],
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string'}],
      fieldset: 'hero',
      validation: Rule => Rule.required().min(4).max(4),
    },
    {
      name: 'featuredText',
      title: 'Featured Text',
      type: 'reference',
      to: [{ type: 'textbook' }],
      fieldset: 'featured',
      validation: Rule => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Text Image',
      type: 'image',
      fieldset: 'featured',
    },
  ],
}