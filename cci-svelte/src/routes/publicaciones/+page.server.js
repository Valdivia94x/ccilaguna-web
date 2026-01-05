import { client } from '$lib/sanity';

export async function load() {
  try {
    // Query para publicaciones
    const publicationsQuery = `*[_type == "publication"] | order(publishedAt desc) {
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

    // Query para informes
    const reportsQuery = `*[_type == "report"] | order(year desc) {
      _id,
      title,
      description,
      year,
      pages,
      coverImage,
      "pdfUrl": pdfFile.asset->url,
      "size": pdfFile.asset->size
    }`;

    // Fetch ambos tipos en paralelo
    const [publications, reports] = await Promise.all([
      client.fetch(publicationsQuery),
      client.fetch(reportsQuery)
    ]);

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
      reports: reports || [],
      categories: categories || []
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return {
      publications: [],
      reports: [],
      categories: []
    };
  }
}
