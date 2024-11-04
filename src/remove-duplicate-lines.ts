import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button } from './ui-lib';
import { Route } from './router';

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
      h3([text('Output')]),
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

export const removeDuplicateLinesRoute: Route = {
  pathname: '/remove-duplicate-lines',
  title: 'Remove Duplicate Lines',
  mkPageElem: mkRemoveDuplicateLinesPage,
};