import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, img, select, option, header, textInput } from './framework/ui/ui-core';
import { routerFindRouteAndLocale, Route, Router } from './framework/router';
import * as plainTextEditor from './ui/plain-text-editor';
import { appList, languageList } from './ui/ui-components';
import { changeSubdomain, getApexHost, getSubdomain, getUrlWithNewSubdomain } from './framework/urlUtil';
import fuzzysort from 'fuzzysort';

import './ui/style.css'

import { commands, generateGuidsCommand, randomizeLinesCommand } from './commands';
import { initAnalytics, trackEvent, trackPageView } from './framework/analytics';
import { getFirstSupportedPreferredLanguage, getLanguage, MaybeLocalizedString, setLanguage, setStrings, toLocalizedString, translate } from './framework/localization';
import { strings } from './strings';
import { CommandViewProps, getCommandPathName, mkRouteFromCommand } from './ui/command-view';
import { isDevEnv } from './config';
import { removeAccents } from './framework/textUtil';

// TODO: add plain-text editor to search bar?

const appElem = document.getElementById('app')!;
let routeContainerElem: HTMLElement;

let commandSearchData: any;

export function trackCommandSearch(searchQuery: string) {
  trackEvent('command_search', {
    query: searchQuery
  });
}

function renderPageTemplate() {
  const language = getLanguage();
  const rootUrl = (language === 'en') ? `${window.location.protocol}//${getApexHost()}` : `${window.location.protocol}//${language}.${getApexHost()}`;

  let searchResultsElem: HTMLElement;

  appElem.append(
    div([
      header([
        div({ class: 'row-1' }, [
          div([
            h1({ class: 'logo' }, [
              a({ href: rootUrl }, [
                img({ src: 'favicon.svg', alt: 'Free App Kit' }),
                text('freeappkit.com', /* disableTranslation: */ true)
              ])
            ]),
            h2({ class: 'tag-line' }, [
              text(strings.freeWebApplications)
            ])
          ]),
          div({ class: 'support-us-container' }, [
            select({ value: getLanguage(), onChange: changeLocale, style: "margin-bottom: 1rem;" }, [
              option({ value: 'en' }, [text('English', /* disableTranslation: */ true)]),
              option({ value: 'es' }, [text('Español', /* disableTranslation: */ true)]),
            ]),
            button({ style: "margin-bottom: 1rem;" }, [
              a({ href: 'https://www.patreon.com/bePatron?u=4644571', target: "_blank", class: 'patreon-button' }, [text('Support us on Patreon!')])
            ])
          ])
        ]),
        div({ class: 'row-2', style: 'position: relative' }, [
          textInput({ placeholder: 'Search our apps...', style: 'width: 100%;', onInput: searchForCommands }),
          (searchResultsElem = ul({ class: 'search-results hidden' }))
        ])
      ]),
      (routeContainerElem = div({ id: "route-container" }))
    ])
  );

  function changeLocale(e: Event) {
    const selectElem = e.target as HTMLSelectElement;
    const newLocale = selectElem.value;
    const pathname = decodeURIComponent(window.location.pathname);
    const [route, _] = routerFindRouteAndLocale(router, pathname);
    const localizedPathname = toLocalizedString(route.pathname) as any;

    if (localizedPathname[newLocale] !== undefined) {
      const newUrl = getUrlWithNewSubdomain(new URL(window.location.href), undefined);
      newUrl.pathname = localizedPathname[newLocale];
      window.location.href = newUrl.href;
    } else {
      changeSubdomain(newLocale);
    }
  }

  function searchForCommands(e: Event) {
    const inputElem = e.target as HTMLInputElement;
    const query = removeAccents(inputElem.value.toLowerCase().trim());

    const searchResults = fuzzysort.go(query, commandSearchData, { key: 'indexedName' });
    const matches = searchResults.map(r => (r.obj as any));

    const anyQuery = query.length > 0;

    if (anyQuery) {
      trackCommandSearch(query);
    }

    if (matches.length === 0) {
      if (anyQuery) {
        searchResultsElem.classList.add('hidden');
        return;
      } else {
        searchResultsElem.classList.remove('hidden');
        searchResultsElem.replaceChildren(li([text('No results found.')]));
        return;
      }
    } else {
      searchResultsElem.classList.remove('hidden');
      searchResultsElem.replaceChildren(
        ...matches.map(m => li([a({ href: translate(m.pathname) }, [text(translate(m.name))])]))
      );
    }
  }

  // HACK: find child select elements of appElem, and re-set their values to get the right option to be selected
  const selectElems = appElem.querySelectorAll('select');
  selectElems.forEach(selectElem => {
    const valueAttr = selectElem.getAttribute('value');

    if (valueAttr !== null) {
      selectElem.value = valueAttr;
    }
  });
}


// #region Pages

const mkHomePage = () =>
  div([
    div([
      h3([text('Our apps:')]),
      appList()
    ]),
    div([
      h3([text('Supported languages:')]),
      languageList()
    ])
  ]);

function mkNotFoundPage() {
  return text('Page not found!');
}

// #endregion Pages

// #region Router

const commandViewPropsOverrides = [
  {
    command: randomizeLinesCommand,
    viewProps: {
      autoRunOnArgChange: false
    } as CommandViewProps
  },
  {
    command: generateGuidsCommand,
    viewProps: {
      autoRunOnArgChange: false
    } as CommandViewProps
  }
];

const routes: Route[] = [
  {
    pathname: '/',
    title: undefined,
    mkPageElem: mkHomePage,
  },
  
  plainTextEditor.route,
  ...commands.map(c => {
    const viewProps = commandViewPropsOverrides.find(o => o.command === c)?.viewProps;
    return mkRouteFromCommand(c, viewProps);
  })
  //...plainTextEditor.plainTextEditorCommands.map(plainTextEditor.mkRouteFromPlainTextEditorCommand),
  //...commands.except(plainTextEditor.plainTextEditorCommands).map(mkRouteFromCommand)
];

export function generateSitemap() {
  const urlNodes = routes.flatMap(route => {
    const localizedPathname = toLocalizedString(route.pathname);

    // TODO: routes without accented characters
    
    return Object.keys(localizedPathname)
      .map(locale => `<url><loc>https://freeappkit.com${(localizedPathname as any)[locale]}</loc></url>`);
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlNodes}</urlset>`;
}

const notFoundRoute: Route = {
  pathname: '/page-not-found',
  title: 'Page Not Found',
  mkPageElem: mkNotFoundPage,
};

const router: Router = {
  routes,
  notFoundRoute,
}

function selectLocale(localeFromRoute: string | undefined) {
  const subdomain = getSubdomain();
  if ((subdomain !== undefined) && (subdomain !== 'www')) {
    return subdomain;
  }
  
  if (localeFromRoute !== undefined) {
    return localeFromRoute;
  }

  return getFirstSupportedPreferredLanguage();
}

function changeRoute(pathname: string) {
  setStrings(strings);
  
  let [route, localeFromRoute] = routerFindRouteAndLocale(router, pathname);

  const locale = selectLocale(localeFromRoute);
  setLanguage(locale);

  commandSearchData =
    commands
      .map(c => ({
        indexedName: removeAccents(translate(c.name).trim().toLocaleLowerCase()),
        name: c.name,
        pathname: getCommandPathName(c)
      }))
      .concat([
        {
          indexedName: removeAccents(translate(plainTextEditor.route.title!).trim().toLocaleLowerCase()),
          name: plainTextEditor.route.title!,
          pathname: plainTextEditor.route.pathname
        }
      ]);

  renderPageTemplate();

  document.title = (route.title !== undefined)
    ? `${translate(route.title)} - Free App Kit`
    : 'Free App Kit';

  // Send page view to Google Analytics now that the page title is set.
  if (!isDevEnv()) {
    initAnalytics();

    trackPageView();
  }

  setPageElem(route.mkPageElem());
}

// #endregion Router

function run() {
  changeRoute(decodeURIComponent(location.pathname));
}

function setPageElem(pageElem: Node) {
  routeContainerElem.replaceChildren(pageElem);
}

run();