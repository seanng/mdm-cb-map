import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'The title that appears in the browser tab & search results',
    }),
    // defineField({
    //   name: 'metaDescription',
    //   title: 'Meta Description',
    //   type: 'text',
    //   description: 'The site description for SEO purposes',
    //   validation: (rule) => rule.required(),
    // }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'The modules that appear on the home page',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'module',
          type: 'module',
        }),
      ],
    }),
  ],
})
