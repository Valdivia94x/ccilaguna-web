import { redirect } from '@sveltejs/kit';

export function load() {
  // Redirect permanente a la página unificada de publicaciones con filtro de informes
  throw redirect(301, '/publicaciones?tipo=informes');
}
