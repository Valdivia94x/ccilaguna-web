import { client } from '$lib/sanity';

export async function load() {
  // OJO: Agregamos 'size' dentro de la referencia del asset
  const query = `*[_type == "report"] | order(year desc) {
    _id,
    title,
    description,
    year,
    pages, // Este sigue siendo manual
    coverImage,
    "pdfUrl": pdfFile.asset->url,
    "size": pdfFile.asset->size  // <--- ¡AQUÍ ESTÁ EL DATO AUTOMÁTICO!
  }`;

  const reports = await client.fetch(query);

  return { reports };
}