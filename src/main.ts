import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, img } from './ui-core';
import { Route } from './router';
import { removeDuplicateLinesRoute, removeDuplicateLinesRoute2 } from './remove-duplicate-lines';
import { sortLinesRoute } from './sort-lines';

import './style.css'

const appElem = document.getElementById('app')!;

appElem.append(
  div([
    div({ class: 'header' }, [
      div([
        h1({ class: 'logo' }, [
          a({ href: '/' }, [
            img({ src: 'favicon.svg', alt: 'Free App Kit' }),
            text('Free App Kit')
          ])
        ]),
        h2({ class: 'tag-line' }, [
          text('Free web applications!')
        ])
      ]),
      div({ class: 'support-us-container' }, [
        button({ style: "margin-bottom: 1rem;" }, [
          a({ href: 'https://www.patreon.com/bePatron?u=4644571', target: "_blank", class: 'patreon-button' }, [text('Support us on Patreon!')])
        ])
      ])
    ]),
    div({ id: "route-container" }, [
    ])
  ])
);

const routeContainerElem = document.getElementById('route-container')!;

// #region Pages

const mkHomePage = () =>
  div([
    p([text('Our apps:')]),
    ul([
      li([
        a({ href: removeDuplicateLinesRoute.pathname }, [text('Remove Duplicate Lines')]),
      ]),
      li([
        a({ href: sortLinesRoute.pathname }, [text('Sort Lines')]),
      ])
    ])
  ]);

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
  sortLinesRoute,
];

const notFoundRoute: Route = {
  pathname: '/page-not-found',
  title: 'Page Not Found',
  mkPageElem: mkNotFoundPage,
};

function changeRoute(pathname: string) {
  let route = routes.find(route => route.pathname === pathname);
  if (route === undefined) { route = notFoundRoute; }

  document.title = (route.title !== undefined)
    ? `${route.title} - Free App Kit`
    : 'Free App Kit';

  // Send page view to Google Analytics now that the page title is set.
  gtag('event', 'page_view');

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