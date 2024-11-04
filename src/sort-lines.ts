import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './ui-core';
import { Route } from './router';
import {  sortLines } from './util';
import { copyToClipboardButton } from './ui-components';

const mkSortLinesPage = () => {
  let inputElem: HTMLTextAreaElement;
  let outputElem: HTMLTextAreaElement;
  let copySuccessTextElem: HTMLSpanElement;

  const page = div([
    h2([
      text('Sort Lines')
    ]),
    div([
      h3([text('Input')]),
      (inputElem = textArea({ style: 'min-height: 300px' })),
      div([

      ]),
      button({ onClick: onSubmit }, [text('Sort')]),
    ]),
    div([
      h3([
        text('Output'),
        copyToClipboardButton(() => outputElem),
        (copySuccessTextElem = span({ }, [text('')])),
      ]),
      (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
    ]),
  ]);

  return page;

  function onSubmit() {
    outputElem.value = sortLines(inputElem.value);
  }
}

export const sortLinesRoute: Route = {
  pathname: '/sort-lines',
  title: 'Sort Lines',
  mkPageElem: mkSortLinesPage,
};