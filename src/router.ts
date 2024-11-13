import { MaybeLocalizedString, toLocalizedString } from "./localization";
import { removeAccents } from "./textUtil";

export interface Route {
  pathname: MaybeLocalizedString;
  title: MaybeLocalizedString | undefined;
  mkPageElem: () => Node;
}

let routes: Route[] = [];
let notFoundRoute: Route;

export function setRoutes(newRoutes: Route[], newNotFoundRoute: Route) {
  routes = newRoutes;
  notFoundRoute = newNotFoundRoute;
}

export function findRouteAndLocale(pathname: string): [Route, string | undefined] {
  const pathnamesToRouteAndLocales: { [pathname: string]: [Route, string] } = {};
  
  for (const route of routes) {
    const localizedPathname = toLocalizedString(route.pathname);

    for (const locale in localizedPathname) {
      const pathname = (localizedPathname as any)[locale];

      if (pathnamesToRouteAndLocales[pathname] !== undefined) {
        throw new Error(`Duplicate pathname: ${pathname}`);
      }
      
      pathnamesToRouteAndLocales[pathname] = [route, locale];
      
      const normalizedPathname = removeAccents(pathname);
      if (normalizedPathname !== pathname) {
        pathnamesToRouteAndLocales[normalizedPathname] = [route, locale];
      }
    }
  }

  if (pathnamesToRouteAndLocales[pathname] !== undefined) {
    const routeAndLocale = pathnamesToRouteAndLocales[pathname];
    const route = routeAndLocale[0];
    
    if (pathname === '/') {
      return [route, undefined];
    } else {
      return routeAndLocale;
    }
  } else {
    return [notFoundRoute, undefined];
  }
}