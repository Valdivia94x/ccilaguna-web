import { client } from '$lib/sanity';

export async function load() {
  try {
    // Pedimos los boletines ordenados por fecha (del más reciente al más viejo)
    const query = `*[_type == "newsletter"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "size": pdfFile.asset->size
    }`;

    const newsletters = await client.fetch(query);

    return {
      newsletters: newsletters || []
    };
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return {
      newsletters: []
    };
  }
}