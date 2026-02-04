import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: 'Client Logos',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'logoImage', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'logoUrl', title: 'Logo URL (optional)', type: 'url' }),
    defineField({ name: 'fallbackUrl', title: 'Fallback URL (optional)', type: 'url' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
})
