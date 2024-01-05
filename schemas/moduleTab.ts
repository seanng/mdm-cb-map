import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'moduleTab',
  title: 'Module Tab',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title that appears on the module tab',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'moduleLink',
          type: 'moduleLink',
        }),
      ],
    }),
  ],
})
