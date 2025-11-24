// src/routes/blog/[slug]/+page.server.js
import { client } from '$lib/sanity';

export async function load({ params }) {
  // params.slug es el texto final de la URL (ej: "participacion-ciudadana")
  const { slug } = params;

  // Query de GROQ: Trae el post que coincida con el slug
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    author,
    mainImage,
    publishedAt,
    body,
    category,
    slug
  }`;

  const post = await client.fetch(query, { slug });

  // Si no existe la noticia, devolvemos un error 404
  if (!post) {
    return {
      status: 404,
      error: new Error('Noticia no encontrada')
    };
  }

  // Query para obtener artículos relacionados (misma categoría, excluyendo el actual)
  const relatedQuery = `*[_type == "post" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...3]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    category,
    body
  }`;

  const relatedPosts = await client.fetch(relatedQuery, {
    category: post.category,
    slug
  });

  return {
    post,
    relatedPosts: relatedPosts || []
  };
}