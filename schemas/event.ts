import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The title of the event',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
      description: 'The URL of the event post',
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'The city (or Online) where the event is being held',
      validation: (rule) => rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'startsAt',
      title: 'Starts At',
      type: 'datetime',
      description:
        "The event's start date. Events will be ordered chronologically.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be displayed on the newsletter homepage representing the event. (340x170)',
      type: 'image',
      validation: (rule) => rule.required(),
      options: { hotspot: true },
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'title',
        },
      },
    }),
  ],
})
