import { defineField, defineType } from 'sanity'

import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'newsPublication',
  title: 'News Publication',
  icon: EarthGlobeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {
            title: 'English',
            value: 'en',
          },
          {
            title: 'Traditional Chinese',
            value: 'tw',
          },
          {
            title: 'Simplified Chinese',
            value: 'cn',
          },
        ],
      },
    }),
  ],
})
