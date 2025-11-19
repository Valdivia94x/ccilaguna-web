// src/routes/blog/[slug]/+page.server.js
import { client } from '$lib/sanity';

export async function load({ params }) {
  // params.slug es el texto final de la URL (ej: "participacion-ciudadana")
  const { slug } = params;

  // Query de GROQ: Trae el post que coincida con el slug
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    publishedAt,
    body,
    category
  }`;

  const post = await client.fetch(query, { slug });

  // Si no existe la noticia, devolvemos un error 404
  if (!post) {
    return {
      status: 404,
      error: new Error('Noticia no encontrada')
    };
  }

  return {
    post
  };
}