import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './ui-core';
import { Route } from './router';
import { removeDuplicateLines, waitMs } from './util';
import { copyToClipboardButton } from './ui-components';

const mkRemoveDuplicateLinesPage = () => {
  let inputElem: HTMLTextAreaElement;
  let outputElem: HTMLTextAreaElement;
  let copySuccessTextElem: HTMLSpanElement;

  const page = div([
    h2([
      text('Remove Duplicate Lines')
    ]),
    div([
      h3([text('Input')]),
      (inputElem = textArea({ style: 'min-height: 300px' })),
      button({ onClick: removeDuplicateLinesOnClick }, [text('Remove Duplicate Lines')]),
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

  function removeDuplicateLinesOnClick() {
    outputElem.value = removeDuplicateLines(inputElem.value);
  }
}

export const removeDuplicateLinesRoute: Route = {
  pathname: '/remove-duplicate-lines',
  title: 'Remove Duplicate Lines',
  mkPageElem: mkRemoveDuplicateLinesPage,
};

export const removeDuplicateLinesRoute2: Route = {
  pathname: '/dedupe-lines',
  title: 'Remove Duplicate Lines',
  mkPageElem: mkRemoveDuplicateLinesPage,
};