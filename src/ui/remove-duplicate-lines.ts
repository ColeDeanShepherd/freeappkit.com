import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './lib/ui-core';
import { Route } from '../router';
import { detectAndRemoveDuplicateLines, removeDuplicateLines } from '../util';
import { copyToClipboardButton } from './ui-components';
import { strings } from '../strings';

const mkRemoveDuplicateLinesPage = () => {
  let inputElem: HTMLTextAreaElement;
  let outputElem: HTMLTextAreaElement;
  let duplicateLinesElem: HTMLTextAreaElement;

  const page = div([
    h2([
      text('Remove Duplicate Lines')
    ]),
    p([text(strings.removeDuplicateLinesDescription)]),
    div([
      h3([text('Paste your text below')]),
      (inputElem = textArea({ style: 'min-height: 300px' })),
      div({ class: 'button-bar' }, [
        button({ onClick: removeDuplicateLinesOnClick }, [text('Remove Duplicate Lines')]),
        button({ onClick: resetOnClick }, [text('Reset')]),
      ])
    ]),
    div([
      h3([
        span({ style: 'margin-right: 1rem;' }, [ text('De-duplicated text') ]),
        copyToClipboardButton(() => outputElem)
      ]),
      (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
    ]),
    div([
      h3([
        span({ style: 'margin-right: 1rem;' }, [ text('Duplicate lines that were removed') ]),
        copyToClipboardButton(() => duplicateLinesElem)
      ]),
      (duplicateLinesElem = textArea({ readonly: true, style: 'min-height: 300px' })),
    ]),
  ]);

  return page;

  function removeDuplicateLinesOnClick() {
    const { uniqueLines, duplicateLines } = detectAndRemoveDuplicateLines(inputElem.value);

    outputElem.value = uniqueLines;
    duplicateLinesElem.value = duplicateLines;
  }

  function resetOnClick() {
    inputElem.value = '';
    outputElem.value = '';
    duplicateLinesElem.value = '';
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