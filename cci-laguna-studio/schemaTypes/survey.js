// schemaTypes/survey.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'survey',
  title: 'Encuesta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().error('El título es obligatorio')
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Breve resumen de la encuesta'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime'
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      description: 'Tamaño ideal: 1200×675px (16:9). Mínimo 800×450px. Se muestra como tarjeta de la encuesta.',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: (rule) => rule.required().error('El archivo PDF es obligatorio')
    })
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'coverImage'
    },
    prepare({title, publishedAt, media}) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'Sin fecha'
      return {
        title: title || 'Sin título',
        subtitle: date,
        media
      }
    }
  }
})
