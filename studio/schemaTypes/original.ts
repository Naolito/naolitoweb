import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'original',
  title: 'Naolito Originals',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'tag', title: 'Tag', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'likes', title: 'Likes', type: 'number', initialValue: 0 }),
    defineField({ name: 'videoFile', title: 'Video File', type: 'file' }),
    defineField({ name: 'videoUrl', title: 'Video URL (optional)', type: 'url' }),
    defineField({ name: 'posterImage', title: 'Poster Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'posterUrl', title: 'Poster URL (optional)', type: 'url' }),
    defineField({
      name: 'ratio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
      },
      initialValue: 'landscape',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
})
