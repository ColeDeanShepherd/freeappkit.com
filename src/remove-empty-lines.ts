import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label } from './ui-core';
import { Route } from './router';
import { removeEmptyLines, sortLines } from './util';
import { copyToClipboardButton } from './ui-components';

const mkRemoveEmptyLinesPage = () => {
  let inputElem: HTMLTextAreaElement;
  let outputElem: HTMLTextAreaElement;
  let alsoRemoveLinesOfBlankCharsCheckboxElem: HTMLInputElement;

  const page = div([
    h2([
      text('Remove Empty Lines')
    ]),
    div([
      h3([text('Input')]),
      (inputElem = textArea({ style: 'min-height: 300px' })),
      div({ style: "margin: 1rem 0" }, [
        (alsoRemoveLinesOfBlankCharsCheckboxElem = checkbox()),
        label([text('Also remove lines of blank characters')]),
      ]),
      button({ onClick: onSubmit }, [text('Submit')]),
    ]),
    div([
      h3([
        text('Output'),
        copyToClipboardButton(() => outputElem)
      ]),
      (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
    ]),
  ]);

  return page;

  function onSubmit() {
    const alsoRemoveLinesOfBlankChars = alsoRemoveLinesOfBlankCharsCheckboxElem.checked;
    outputElem.value = removeEmptyLines(inputElem.value, alsoRemoveLinesOfBlankChars);
  }
}

export const removeEmptyLinesRoute: Route = {
  pathname: '/remove-empty-lines',
  title: 'Remove Empty Lines',
  mkPageElem: mkRemoveEmptyLinesPage,
};