// schemaTypes/publication.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().error('El título es obligatorio')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required().error('El slug es obligatorio')
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      validation: (rule) => rule.required().error('La fecha de publicación es obligatoria')
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Estudios', value: 'estudios'},
          {title: 'Investigaciones', value: 'investigaciones'},
          {title: 'Reportes', value: 'reportes'},
          {title: 'Documentos', value: 'documentos'},
          {title: 'Análisis', value: 'analisis'}
        ],
        layout: 'dropdown'
      },
      validation: (rule) => rule.required().error('La categoría es obligatoria')
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300).warning('La descripción no debe exceder los 300 caracteres')
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      description: 'Tamaño ideal: 1200×675px (16:9). Mínimo 800×450px. Se muestra como tarjeta en publicaciones.',
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
      }
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      description: 'Autor o responsable de la publicación'
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Etiquetas para búsqueda y filtrado'
    })
  ],
  orderings: [
    {
      title: 'Fecha de Publicación (Más reciente)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    },
    {
      title: 'Fecha de Publicación (Más antiguo)',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}]
    },
    {
      title: 'Categoría',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}]
    }
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
