import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const { id } = params;

    const query = `*[_type == "regidorReport" && _id == $id][0]{
      _id,
      city,
      reportDate,
      periodType,
      periodStartMonth,
      periodStartYear,
      periodEndMonth,
      periodEndYear,
      semester,
      semesterYear,
      description,
      coverImage,
      "pdfUrl": pdfFile.asset->url,
      "pdfSize": pdfFile.asset->size
    }`;

    const report = await client.fetch(query, { id });

    if (!report) {
      throw error(404, 'Informe no encontrado');
    }

    return { report };
  } catch (err) {
    console.error('Error fetching regidor report:', err);
    throw error(404, 'Informe no encontrado');
  }
}
