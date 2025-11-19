// schemaTypes/post.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: rule => rule.required().error('El título es obligatorio')
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string', // <--- Esto permite escribir libremente
      description: 'Escribe la categoría del post (ej: Transparencia, Seguridad, Eventos)',
      validation: rule => rule.required().error('Debes escribir una categoría')
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      description: 'Haz clic en "Generate" para crear el link automáticamente',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true, // Esto permite recortar la imagen si es necesario
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    }),
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}] // Esto crea el editor de texto rico
    }),
  ],
})