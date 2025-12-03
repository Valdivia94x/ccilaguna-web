// schemaTypes/agendaDocument.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'agendaDocument',
  title: 'Documento de Agenda',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().error('El título es obligatorio')
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Documento',
      type: 'string',
      options: {
        list: [
          {title: 'Informe', value: 'informe'},
          {title: 'Comunicado', value: 'comunicado'}
        ],
        layout: 'radio'
      },
      initialValue: 'informe',
      validation: (rule) => rule.required().error('El tipo de documento es obligatorio')
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required().error('La imagen de portada es obligatoria')
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: (rule) => rule.required().error('El archivo PDF es obligatorio')
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      validation: (rule) => rule.required().error('La fecha de publicación es obligatoria')
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'coverImage'
    },
    prepare({title, type, media}) {
      const typeText = type === 'informe' ? 'Informe' : 'Comunicado'
      return {
        title: `${typeText} - ${title || 'Sin título'}`,
        media
      }
    }
  }
})
