import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label } from './ui-core';
import { Route } from './router';
import { sortLines } from './util';
import { copyToClipboardButton } from './ui-components';

const mkSortLinesPage = () => {
  let inputElem: HTMLTextAreaElement;
  let outputElem: HTMLTextAreaElement;
  let isDescendingCheckboxElem: HTMLInputElement;
  let isCaseSensitiveCheckboxElem: HTMLInputElement;

  const page = div([
    h2([
      text('Sort Lines')
    ]),
    p([text('Sort lines of text with this free online tool. Simply paste your text/list into the 1st box below, configure the tool using the checkboxes, click the "Sort" button, then copy the output from the 2nd box below.')]),
    div([
      h3([text('Paste your text below')]),
      (inputElem = textArea({ style: 'min-height: 300px' })),
      div({ style: "margin: 1rem 0" }, [
        (isDescendingCheckboxElem = checkbox()),
        label([text('Descending Order')]),
      ]),
      div({ style: "margin: 1rem 0" }, [
        (isCaseSensitiveCheckboxElem = checkbox({ checked: true })),
        label([text('Case Sensitive')]),
      ]),
      button({ onClick: onSubmit }, [text('Sort')]),
    ]),
    div([
      h3([
        text('Sorted lines'),
        copyToClipboardButton(() => outputElem)
      ]),
      (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
    ]),
  ]);

  return page;

  function onSubmit() {
    const isDescending = isDescendingCheckboxElem.checked;
    const isCaseSensitive = isCaseSensitiveCheckboxElem.checked;
    outputElem.value = sortLines(inputElem.value, isDescending, isCaseSensitive);
  }
}

export const sortLinesRoute: Route = {
  pathname: '/sort-lines',
  title: 'Sort Lines',
  mkPageElem: mkSortLinesPage,
};