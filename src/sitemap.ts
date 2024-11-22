import { toLocalizedString } from "./framework/localization";
import { Route } from "./framework/router";

export function generateSitemap(routes: Route[]) {
  const urlNodes = routes.flatMap(route => {
    const localizedPathname = toLocalizedString(route.pathname);

    // TODO: routes without accented characters

    return Object.keys(localizedPathname)
      .map(locale => `<url><loc>https://freeappkit.com${(localizedPathname as any)[locale]}</loc></url>`);
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlNodes}</urlset>`;
}