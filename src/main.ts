import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, img, select, option } from './ui-core';
import { Route } from './router';
import { removeDuplicateLinesRoute, removeDuplicateLinesRoute2 } from './remove-duplicate-lines';
import * as plainTextEditor from './plain-text-editor';
import { appList } from './ui-components';
import { except, isDevEnv } from './util';

import './style.css'
import { mkRouteFromCommand } from './command';
import { commands } from './commands';
import { gtag, initGoogleAnalytics } from './analytics';
import { MaybeLocalizedString, setLanguage as setLocale, setStrings, toLocalizedString, translate } from './localization';
import { strings } from './strings';

const appElem = document.getElementById('app')!;
let routeContainerElem: HTMLElement;

function renderPageTemplate() {
  appElem.append(
    div([
      div({ class: 'header' }, [
        div([
          h1({ class: 'logo' }, [
            a({ href: '/' }, [
              img({ src: 'favicon.svg', alt: 'Free App Kit' }),
              text('freeappkit.com', /* disableTranslation: */ true)
            ])
          ]),
          h2({ class: 'tag-line' }, [
            text(strings.freeWebApplications)
          ])
        ]),
        div({ class: 'support-us-container' }, [
          select({ style: "display: none; margin-bottom: 1rem;" }, [
            option({ value: 'en' }, [text('English')]),
            option({ value: 'es' }, [text('Español')]),
          ]),
          button({ style: "margin-bottom: 1rem;" }, [
            a({ href: 'https://www.patreon.com/bePatron?u=4644571', target: "_blank", class: 'patreon-button' }, [text('Support us on Patreon!')])
          ])
        ])
      ]),
      (routeContainerElem = div({ id: "route-container" })),
      div([
        p([text('Our apps:')]),
        appList()
      ])
    ])
  );
}


// #region Pages

const mkHomePage = () =>
  div([]);

function mkNotFoundPage() {
  return text('Page not found!');
}

// #endregion Pages

// #region Router

const routes: Route[] = [
  {
    pathname: '/',
    title: undefined,
    mkPageElem: mkHomePage,
  },
  removeDuplicateLinesRoute,
  removeDuplicateLinesRoute2,
  plainTextEditor.route,
  ...plainTextEditor.plainTextEditorCommands.map(plainTextEditor.mkRouteFromPlainTextEditorCommand),
  ...except(commands, plainTextEditor.plainTextEditorCommands).map(mkRouteFromCommand)
];

const notFoundRoute: Route = {
  pathname: '/page-not-found',
  title: 'Page Not Found',
  mkPageElem: mkNotFoundPage,
};

function equalsAnyTranslation(a: string, b: MaybeLocalizedString): boolean {
  if (typeof b === 'string') {
    return a === b;
  } else {
    return Object.values(b).some(v => a === v);
  }
}

function findRouteAndLocale(pathname: string): [Route, string] {
  const pathnamesToRouteAndLocales: { [pathname: string]: [Route, string] } = {};
  
  for (const route of routes) {
    const localizedPathname = toLocalizedString(route.pathname);

    for (const locale in localizedPathname) {
      pathnamesToRouteAndLocales[(localizedPathname as any)[locale]] = [route, locale];
    }
  }

  if (pathnamesToRouteAndLocales[pathname] !== undefined) {
    return pathnamesToRouteAndLocales[pathname];
  } else {
    return [notFoundRoute, 'en'];
  }
}

function changeRoute(pathname: string) {
  let [route, locale] = findRouteAndLocale(pathname);

  setStrings(strings);
  setLocale(locale);
  
  renderPageTemplate();

  document.title = (route.title !== undefined)
    ? `${translate(route.title)} - Free App Kit`
    : 'Free App Kit';

  // Send page view to Google Analytics now that the page title is set.
  if (!isDevEnv()) {
    initGoogleAnalytics();

    gtag('event', 'page_view');
    gtag('event', 'conversion', {
      'send_to': 'AW-16763524210/YqTZCObdg-UZEPKovLk-',
      'value': 1.0,
      'currency': 'USD'
    });
  }

  setPageElem(route.mkPageElem());
}

// #endregion Router

function run() {
  changeRoute(location.pathname);
}

function setPageElem(pageElem: Node) {
  routeContainerElem.replaceChildren(pageElem);
}

run();