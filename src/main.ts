import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea } from './ui-lib';
import './style.css'

const appElem = document.getElementById('app')!;

// #region Pages

const mkHomePage = () =>
  div([
    h1([
      text('Free App Kit')
    ]),
    h2([
      text('Free App Kit is a collection of free web-based applications.')
    ]),
    p([text('Our apps:')]),
    ul([
      li([
        a({ href: '/remove-duplicate-lines' }, [text('Remove Duplicate Lines')]),
      ]),
    ])
  ]);

const mkRemoveDuplicateLinesPage = () =>
  div([
    h1([
      text('Remove Duplicate Lines')
    ]),
    h2([
      text('Remove duplicate lines from a list of lines.')
    ]),
    div([
      h3([text('Input')]),
      p([text('Enter a list of lines.')]),
      h3([text('Output')]),
      p([text('The list of lines with duplicates removed.')]),
    ]),
    div([
      h3([text('Example')]),
      div([
        h4([text('Input')]),
        p([text('a')]),
        p([text('b')]),
        p([text('a')]),
        h4([text('Output')]),
        p([text('a')]),
        p([text('b')]),
      ]),
    ]),
    div([
      h3([text('Input')]),
      textArea({}),
    ]),
    div([
      h3([text('Output')]),
      textArea({}),
    ]),
  ]);

function mkNotFoundPage() {
  return text('Page not found!');
}

// #endregion Pages

// #region Router

interface Route {
  pathname: string;
  title: string | undefined;
  mkPageElem: () => Node;
}

const routes: Route[] = [
  {
    pathname: '/',
    title: undefined,
    mkPageElem: mkHomePage,
  },
  {
    pathname: '/remove-duplicate-lines',
    title: 'Remove Duplicate Lines',
    mkPageElem: mkRemoveDuplicateLinesPage,
  },
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
  console.log(location);
  changeRoute(location.pathname);
}

function setPageElem(pageElem: Node) {
  appElem.replaceChildren(pageElem);
}

run();