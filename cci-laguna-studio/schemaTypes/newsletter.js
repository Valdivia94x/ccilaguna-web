// schemaTypes/newsletter.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Boletín',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Boletín',
      type: 'string',
      validation: rule => rule.required()
    }),
    // ↓↓↓ NUEVO: SLUG (Para la URL de la página) ↓↓↓
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Tema',
      type: 'string',
      options: {
        list: [
          {title: 'Seguridad', value: 'Seguridad'},
          {title: 'Empleo', value: 'Empleo'}
        ],
        layout: 'radio'
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' }
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 2
    }),
    // ↓↓↓ NUEVO: BODY (Para el contenido completo de la página) ↓↓↓
    defineField({
      name: 'body',
      title: 'Contenido del Boletín',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}]
    }),
    defineField({
      name: 'coverImage',
      title: 'Portada',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file',
      options: { accept: '.pdf' }
    })
  ],
  // Esto ayuda a que la lista en el panel se vea ordenada por fecha
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'coverImage'
    },
    prepare(selection) {
      const {title, date, media} = selection
      return {
        title: title,
        subtitle: date, // Muestra la fecha abajo del título
        media: media
      }
    }
  }
})