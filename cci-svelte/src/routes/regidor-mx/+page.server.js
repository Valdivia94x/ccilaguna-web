import { client } from '$lib/sanity';

const ITEMS_PER_PAGE = 8;
const VALID_CITIES = ['Torreón', 'Gómez Palacio', 'Lerdo', 'Matamoros'];

export async function load({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const city = url.searchParams.get('city') || '';
    const year = url.searchParams.get('year') || '';
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Filtro de ciudad si está presente
    const cityFilter = city && VALID_CITIES.includes(city) ? ` && city == "${city}"` : '';

    // Filtro de año: usa semesterYear para semestrales, periodEndYear para otros
    const yearNum = parseInt(year);
    const yearFilter = year && !isNaN(yearNum)
      ? ` && ((periodType == "semester" && semesterYear == ${yearNum}) || (periodType != "semester" && periodEndYear == ${yearNum}))`
      : '';

    // Query para obtener informes con paginación y filtro opcional
    // Ordenar por fecha del informe (reportDate) de más reciente a más antiguo.
    // Los documentos sin reportDate quedan al final, ordenados por fecha de creación.
    const query = `{
      "reports": *[_type == "regidorReport"${cityFilter}${yearFilter}] | order(reportDate desc, _createdAt desc) [$offset...$limit] {
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
        "pdfUrl": pdfFile.asset->url
      },
      "total": count(*[_type == "regidorReport"${cityFilter}${yearFilter}]),
      "years": array::unique(*[_type == "regidorReport"].semesterYear + *[_type == "regidorReport"].periodEndYear) | order(@ desc)
    }`;

    const { reports, total, years } = await client.fetch(query, {
      offset,
      limit: offset + ITEMS_PER_PAGE
    });

    // Filtrar años válidos (no null) y ordenar descendente
    const validYears = (years || []).filter((y) => y != null).sort((a, b) => b - a);

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
      selectedYear: year,
      cities: VALID_CITIES,
      years: validYears
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
      selectedYear: '',
      cities: VALID_CITIES,
      years: []
    };
  }
}
