import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './ui-lib';
import { Route } from './router';
import "bootstrap-icons/font/bootstrap-icons.css";
import { removeDuplicateLines, waitMs } from './util';

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
      (inputElem = textArea({ id: 'input', style: 'min-height: 300px' })),
      button({ onClick: removeDuplicateLinesOnClick }, [text('Remove Duplicate Lines')]),
    ]),
    div([
      h3([
        text('Output'),
        button({ onClick: copyOutputToClipboard, style: 'margin: 0 1rem;' }, [
          i({ class: 'bi bi-clipboard' })
        ]),
        (copySuccessTextElem = span({ id: 'copy-success-text' }, [text('')])),
      ]),
      (outputElem = textArea({ id: 'output', readonly: true, style: 'min-height: 300px' })),
    ]),
  ]);

  return page;

  function removeDuplicateLinesOnClick() {
    outputElem.value = removeDuplicateLines(inputElem.value);
  }

  async function copyOutputToClipboard() {
    try {
      await navigator.clipboard.writeText(outputElem.value);
    } catch (err) {
      alert('Failed to copy to clipboard');
      return;
    }
    
    copySuccessTextElem.textContent = 'Copied to clipboard!';
    await waitMs(2000);
    copySuccessTextElem.textContent = '';
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