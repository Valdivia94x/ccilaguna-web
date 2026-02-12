// schemaTypes/ally.js
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'ally',
  title: 'Red de Adherentes (Logos)',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'ally' }),
    defineField({
      name: 'name',
      title: 'Nombre de la Organización',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true 
      },
      description: 'Tamaño ideal: 512×512px (cuadrado). Mínimo 200×200px. Formato PNG con fondo transparente o SVG.',
      validation: rule => rule.required()
    }),
    defineField({
        name: 'url',
        title: 'Sitio Web (Opcional)',
        type: 'url',
        description: 'Link a su página web si tienen.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
})