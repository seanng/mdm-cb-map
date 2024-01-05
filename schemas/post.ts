import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import randomstring from 'randomstring'
import { apiVersion } from 'libs/sanity.api'
import { postBySlugQuery } from 'libs/sanity.queries'

import author from './author'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

async function slugify(_, __, { getClient }) {
  let slugExists = true
  while (slugExists) {
    const slug = randomstring.generate(8)
    const client = getClient({ apiVersion })
    slugExists = !!(await client.fetch(postBySlugQuery, { slug }))
    if (!slugExists) return slug
  }
}

export default defineType({
  name: 'post',
  title: 'Newsletter Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: author.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click on "Generate" to create the URL of the post',
      options: {
        source: 'title',
        maxLength: 8,
        slugify,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, date, author }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
