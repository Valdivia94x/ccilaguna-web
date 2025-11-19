// schemaTypes/report.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'report',
  title: 'Informe (PDF)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Informe',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
      description: 'Resumen que aparece en la tarjeta (máx 2-3 líneas).',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'string', // Usamos string para flexibilidad (ej: "2023-2024")
      initialValue: new Date().getFullYear().toString()
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Ej: Informe Anual, Finanzas, Estudio Especial',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Portada del Informe',
      type: 'image',
      options: { hotspot: true },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'pages',
      title: 'Número de Páginas',
      type: 'number'
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file', // <--- El tipo mágico para subir documentos
      options: {
        accept: '.pdf' // Solo permite subir PDFs
      },
      validation: rule => rule.required()
    })
  ]
})