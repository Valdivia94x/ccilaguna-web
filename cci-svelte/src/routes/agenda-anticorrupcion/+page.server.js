import { client } from '$lib/sanity';

export async function load() {
  try {
    const query = `{
      "informes": *[_type == "agendaDocument" && type == "informe"] | order(publishedAt desc) {
        _id,
        title,
        type,
        publishedAt,
        coverImage,
        "pdfUrl": pdfFile.asset->url
      },
      "comunicados": *[_type == "agendaDocument" && type == "comunicado"] | order(publishedAt desc) {
        _id,
        title,
        type,
        publishedAt,
        coverImage,
        "pdfUrl": pdfFile.asset->url
      }
    }`;

    const { informes, comunicados } = await client.fetch(query);

    return {
      informes: informes || [],
      comunicados: comunicados || []
    };
  } catch (error) {
    console.error('Error fetching agenda documents:', error);
    return {
      informes: [],
      comunicados: []
    };
  }
}
