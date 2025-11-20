// src/routes/boletines/[id]/+page.server.js
import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const { id } = params;

    const query = `*[_type == "newsletter" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      category,
      description,
      body,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "pdfUrl": pdfFile.asset->url,
      "size": pdfFile.asset->size
    }`;

    const boletin = await client.fetch(query, { slug: id });

    if (!boletin) {
      throw error(404, 'Boletín no encontrado');
    }

    return { boletin };
  } catch (err) {
    console.error('Error fetching newsletter:', err);
    throw error(404, 'Boletín no encontrado');
  }
}