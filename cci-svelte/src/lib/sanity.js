// src/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'y3oueh1l', // <--- ¡PEGA TU ID AQUÍ!
  dataset: 'production',
  apiVersion: '2024-03-01', // Usamos la fecha de hoy
  useCdn: false // false para desarrollo (ver cambios al instante), true para producción
});

// Esto es un "helper" para poder mostrar las imágenes fácilmente
const builder = imageUrlBuilder(client);

/** @param {any} source */
export function urlFor(source) {
  return builder.image(source);
}