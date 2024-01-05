import { BinaryDocumentIcon } from '@sanity/icons'

import { defineField, defineType } from 'sanity'
import publication from './newsPublication'

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  icon: BinaryDocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the article. Max 30 characters.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'number',
      description: 'Whether or not this is a headline article',
      validation: (rule) => rule.required(),
      initialValue: 0,
      options: {
        list: [
          { value: 0, title: 'False' },
          { value: 1, title: 'True' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The URL of the article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'The date that the article was posted',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be displayed on the newsletter homepage representing the post.',
      type: 'image',
      options: {
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'title',
        },
      },
    }),
    defineField({
      name: 'newsPublication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: publication.name }],
      validation: (rule) => rule.required(),
    }),
  ],
})
