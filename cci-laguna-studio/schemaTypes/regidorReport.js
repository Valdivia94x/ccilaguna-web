// schemaTypes/regidorReport.js
import {defineField, defineType} from 'sanity'

const months = [
  {title: 'Enero', value: 'enero'},
  {title: 'Febrero', value: 'febrero'},
  {title: 'Marzo', value: 'marzo'},
  {title: 'Abril', value: 'abril'},
  {title: 'Mayo', value: 'mayo'},
  {title: 'Junio', value: 'junio'},
  {title: 'Julio', value: 'julio'},
  {title: 'Agosto', value: 'agosto'},
  {title: 'Septiembre', value: 'septiembre'},
  {title: 'Octubre', value: 'octubre'},
  {title: 'Noviembre', value: 'noviembre'},
  {title: 'Diciembre', value: 'diciembre'}
]

const semesters = [
  {title: 'Primer semestre', value: 'primer-semestre'},
  {title: 'Segundo semestre', value: 'segundo-semestre'}
]

export default defineType({
  name: 'regidorReport',
  title: 'Informe Regidor MX',
  type: 'document',
  fieldsets: [
    {
      name: 'periodStart',
      title: 'Período de Inicio',
      options: {columns: 2}
    },
    {
      name: 'periodEnd',
      title: 'Período de Fin',
      options: {columns: 2}
    },
    {
      name: 'semesterPeriod',
      title: 'Período del Semestre',
      options: {columns: 2}
    }
  ],
  fields: [
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      validation: (rule) => rule.required().error('La ciudad es obligatoria')
    }),
    defineField({
      name: 'reportDate',
      title: 'Fecha',
      type: 'date',
      description: 'Fecha del informe (día, mes y año). Campo opcional.',
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    }),
    defineField({
      name: 'periodType',
      title: 'Tipo de Período',
      type: 'string',
      options: {
        list: [
          {title: 'Por meses', value: 'months'},
          {title: 'Por semestre', value: 'semester'}
        ],
        layout: 'radio'
      },
      initialValue: 'months',
      validation: (rule) => rule.required()
    }),
    // Campos para período por meses
    defineField({
      name: 'periodStartMonth',
      title: 'Mes de Inicio',
      type: 'string',
      fieldset: 'periodStart',
      options: {
        list: months
      },
      hidden: ({document}) => document?.periodType !== 'months',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'months' && !value) {
            return 'El mes de inicio es obligatorio'
          }
          return true
        })
    }),
    defineField({
      name: 'periodStartYear',
      title: 'Año de Inicio',
      type: 'number',
      fieldset: 'periodStart',
      initialValue: new Date().getFullYear(),
      hidden: ({document}) => document?.periodType !== 'months',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'months' && !value) {
            return 'El año de inicio es obligatorio'
          }
          return true
        })
    }),
    defineField({
      name: 'periodEndMonth',
      title: 'Mes de Fin',
      type: 'string',
      fieldset: 'periodEnd',
      options: {
        list: months
      },
      hidden: ({document}) => document?.periodType !== 'months',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'months' && !value) {
            return 'El mes de fin es obligatorio'
          }
          return true
        })
    }),
    defineField({
      name: 'periodEndYear',
      title: 'Año de Fin',
      type: 'number',
      fieldset: 'periodEnd',
      initialValue: new Date().getFullYear(),
      hidden: ({document}) => document?.periodType !== 'months',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'months' && !value) {
            return 'El año de fin es obligatorio'
          }
          return true
        })
    }),
    // Campos para período por semestre
    defineField({
      name: 'semester',
      title: 'Semestre',
      type: 'string',
      fieldset: 'semesterPeriod',
      options: {
        list: semesters
      },
      hidden: ({document}) => document?.periodType !== 'semester',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'semester' && !value) {
            return 'El semestre es obligatorio'
          }
          return true
        })
    }),
    defineField({
      name: 'semesterYear',
      title: 'Año',
      type: 'number',
      fieldset: 'semesterPeriod',
      initialValue: new Date().getFullYear(),
      hidden: ({document}) => document?.periodType !== 'semester',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.periodType === 'semester' && !value) {
            return 'El año es obligatorio'
          }
          return true
        })
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      description: 'Tamaño ideal: 800×1130px (proporción A4 vertical). Mínimo 600×850px. Se muestra como portada de informe.',
      options: {
        hotspot: true
      },
      validation: (rule) => rule.required().error('La imagen de portada es obligatoria')
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      description: 'Introducción o descripción del informe que se mostrará en la página de detalle',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Título', value: 'h3'},
            {title: 'Subtítulo', value: 'h4'}
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
              {title: 'Subrayado', value: 'underline'}
            ]
          },
          lists: [
            {title: 'Viñetas', value: 'bullet'},
            {title: 'Numerada', value: 'number'}
          ]
        }
      ]
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF',
      type: 'file',
      description: 'Archivo PDF del informe para descarga',
      options: {
        accept: '.pdf'
      },
      validation: (rule) => rule.required().error('El archivo PDF es obligatorio')
    })
  ],
  orderings: [
    {
      title: 'Año de Inicio (Más reciente)',
      name: 'yearDesc',
      by: [{field: 'periodStartYear', direction: 'desc'}]
    },
    {
      title: 'Año de Inicio (Más antiguo)',
      name: 'yearAsc',
      by: [{field: 'periodStartYear', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      city: 'city',
      periodType: 'periodType',
      startMonth: 'periodStartMonth',
      startYear: 'periodStartYear',
      endMonth: 'periodEndMonth',
      endYear: 'periodEndYear',
      semester: 'semester',
      semesterYear: 'semesterYear',
      media: 'coverImage'
    },
    prepare({city, periodType, startMonth, startYear, endMonth, endYear, semester, semesterYear, media}) {
      let period = ''
      let subtitle = ''

      if (periodType === 'semester' && semester) {
        const semesterText = semester === 'primer-semestre' ? 'Primer semestre' : 'Segundo semestre'
        period = `${semesterText} ${semesterYear || ''}`
        subtitle = `${semesterText} - ${semesterYear || ''}`
      } else if (startMonth && endMonth) {
        if (startYear === endYear) {
          period = `${startMonth}-${endMonth} – ${startYear || ''}`
          subtitle = `Período ${startMonth}-${endMonth} – ${startYear || ''}`
        } else {
          period = `${startMonth} ${startYear || ''} - ${endMonth} ${endYear || ''}`
          subtitle = `Período ${startMonth} ${startYear || ''} - ${endMonth} ${endYear || ''}`
        }
      }

      const title = `Regidor MX Laguna | ${city || 'Sin ciudad'} | Período ${period}`
      return {
        title,
        subtitle,
        media
      }
    }
  }
})
