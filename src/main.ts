import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button } from './ui-lib';
import './style.css'
import { Route } from './router';
import { removeDuplicateLinesRoute } from './remove-duplicate-lines';

const appElem = document.getElementById('app')!;

appElem.append(
  div([
    div({ class: 'header' }, [
      h1({ class: 'logo' }, [
        a({ href: '/' }, [text('Free App Kit')])
      ]),
      h2({ class: 'tag-line' }, [
        text('A collection of free web-based applications.')
      ]),
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
        a({ href: '/remove-duplicate-lines' }, [text('Remove Duplicate Lines')]),
      ]),
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
  removeDuplicateLinesRoute
];

const notFoundRoute: Route = {
  pathname: '/404',
  title: 'Page Not Found',
  mkPageElem: mkNotFoundPage,
};

function changeRoute(pathname: string) {
  let route = routes.find(route => route.pathname === pathname);
  if (route === undefined) { route = notFoundRoute; }

  document.title = (route.title !== undefined)
    ? `${route.title} - Free App Kit`
    : 'Free App Kit';

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