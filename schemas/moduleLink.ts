import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'moduleLink',
  title: 'Module Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name that appears in the module',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Will only show as 2 lines on the site.',
    }),
    // TODO: add icon field (with image upload. see https://www.sanity.io/docs/https://www.sanity.io/docs/assets)
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'A small square image next to title. Pls keep under 5kb.',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'title',
        },
      },
    }),
  ],
})
