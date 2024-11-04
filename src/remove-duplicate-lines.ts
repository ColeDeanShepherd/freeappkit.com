import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './ui-lib';
import { Route } from './router';
import "bootstrap-icons/font/bootstrap-icons.css";
import { waitMs } from './util';

const mkRemoveDuplicateLinesPage = () =>
  div([
    h2([
      text('Remove Duplicate Lines')
    ]),
    div([
      h3([text('Input')]),
      textArea({ id: 'input', style: 'min-height: 300px' }),
      button({ onClick: removeDuplicateLinesOnClick }, [text('Remove Duplicate Lines')]),
    ]),
    div([
      h3([
        text('Output'),
        button({ onClick: copyOutputToClipboard, style: 'margin: 0 1rem;' }, [
          i({ class: 'bi bi-clipboard' })
        ]),
        span({ id: 'copy-success-text' }, [text('')]),
      ]),
      textArea({ id: 'output', readonly: true, style: 'min-height: 300px' }),
    ]),
  ]);

function removeDuplicateLinesOnClick() {
  const inputElem = document.getElementById('input') as HTMLTextAreaElement;
  const outputElem = document.getElementById('output') as HTMLTextAreaElement;

  outputElem.value = removeDuplicateLines(inputElem.value);
}

function removeDuplicateLines(text: string) {
  return Array.from(new Set(text.split('\n'))).join('\n');
}

async function copyOutputToClipboard() {
  const outputElem = document.getElementById('output') as HTMLTextAreaElement;

  try {
    await navigator.clipboard.writeText(outputElem.value);
  } catch (err) {
    alert('Failed to copy to clipboard');
    return;
  }
  
  const copySuccessTextElem = document.getElementById('copy-success-text') as HTMLSpanElement;
  copySuccessTextElem.textContent = 'Copied to clipboard!';
  await waitMs(2000);
  copySuccessTextElem.textContent = '';
}

export const removeDuplicateLinesRoute: Route = {
  pathname: '/remove-duplicate-lines',
  title: 'Remove Duplicate Lines',
  mkPageElem: mkRemoveDuplicateLinesPage,
};

export const reomveDuplicateLinesRoute2: Route = {
  pathname: '/dedupe-lines',
  title: 'Remove Duplicate Lines',
  mkPageElem: mkRemoveDuplicateLinesPage,
};