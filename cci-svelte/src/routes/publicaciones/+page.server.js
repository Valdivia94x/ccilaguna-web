import { client } from '$lib/sanity';

export async function load() {
  try {
    // Pedimos las publicaciones ordenadas por fecha (del más reciente al más viejo)
    const query = `*[_type == "publication"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      author,
      tags,
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

    const publications = await client.fetch(query);

    // Extraer categorías únicas de las publicaciones
    const categoriesSet = new Set();
    publications.forEach((pub) => {
      if (pub.category) {
        categoriesSet.add(pub.category);
      }
    });
    const categories = Array.from(categoriesSet);

    return {
      publications: publications || [],
      categories: categories || []
    };
  } catch (error) {
    console.error('Error fetching publications:', error);
    return {
      publications: [],
      categories: []
    };
  }
}
