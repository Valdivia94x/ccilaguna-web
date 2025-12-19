// schemaTypes/carousel.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'carousel',
  title: 'Carrusel Principal',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Imágenes del Carrusel',
      type: 'array',
      options: {
        layout: 'grid'
      },
      validation: (rule) =>
        rule.max(5).error('Solo se permiten máximo 5 imágenes.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'imagen',
              title: 'Imagen',
              type: 'image',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción',
              type: 'text',
              rows: 2
            })
          ],
          preview: {
            select: {
              descripcion: 'descripcion',
              media: 'imagen'
            },
            prepare({descripcion, media}) {
              return {
                title: descripcion || 'Sin descripción',
                media
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      images: 'images'
    },
    prepare({images}) {
      const count = images?.length || 0
      return {
        title: 'Carrusel Principal',
        subtitle: `${count} imagen${count !== 1 ? 'es' : ''}`
      }
    }
  }
})
