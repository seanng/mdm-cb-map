import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The module title that appears on the Sidebar',
    }),
    // TODO: move columns to module tab instead.
    defineField({
      name: 'columns',
      title: 'Columns',
      description: 'The number of columns in the current module block',
      type: 'string',
      options: {
        list: [
          { title: '5', value: 'five' },
          { title: '6', value: 'six' },
          { title: '7', value: 'seven' },
          { title: '9', value: 'nine' },
        ],
      },
      initialValue: 'seven',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'adTitle',
      title: 'Ad Title',
      description: 'Appears on the right side of the module heading',
      type: 'string',
    }),
    defineField({
      name: 'adUrl',
      title: 'Ad URL',
      description:
        'When the ad title is clicked, this is the URL that is opened. Must include https://.',
      type: 'url',
    }),
    defineField({
      name: 'shouldBoldLinkTitles',
      title: 'Bold Link Titles',
      description: 'Whether the link titles should be bold or not.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'moduleTab' } }],
    }),
  ],
})
