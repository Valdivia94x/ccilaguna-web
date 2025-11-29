import { client } from '$lib/sanity';

const ITEMS_PER_PAGE = 8;
const VALID_CITIES = ['Torreón', 'Gómez Palacio', 'Lerdo', 'Matamoros'];

export async function load({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const city = url.searchParams.get('city') || '';
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Filtro de ciudad si está presente
    const cityFilter = city && VALID_CITIES.includes(city) ? ` && city == "${city}"` : '';

    // Query para obtener informes con paginación y filtro opcional
    const query = `{
      "reports": *[_type == "regidorReport"${cityFilter}] | order(periodStartYear desc) [$offset...$limit] {
        _id,
        city,
        periodType,
        periodStartMonth,
        periodStartYear,
        periodEndMonth,
        periodEndYear,
        semester,
        semesterYear,
        description,
        coverImage,
        "pdfUrl": pdfFile.asset->url
      },
      "total": count(*[_type == "regidorReport"${cityFilter}])
    }`;

    const { reports, total } = await client.fetch(query, {
      offset,
      limit: offset + ITEMS_PER_PAGE
    });

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return {
      reports: reports || [],
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      selectedCity: city,
      cities: VALID_CITIES
    };
  } catch (error) {
    console.error('Error fetching regidor reports:', error);
    return {
      reports: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false
      },
      selectedCity: '',
      cities: VALID_CITIES
    };
  }
}
