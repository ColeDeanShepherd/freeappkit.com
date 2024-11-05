import { text, button, i, span, ul, li, a } from './ui-core';
import "bootstrap-icons/font/bootstrap-icons.css";
import { waitMs } from './util';
import { removeDuplicateLinesRoute } from './remove-duplicate-lines';
import { sortLinesRoute } from './sort-lines';
import { removeEmptyLinesRoute } from './remove-empty-lines';
import { randomizeLinesRoute } from './randomize-lines';

export const copyToClipboardButton = (getTextContainerElem: () => HTMLTextAreaElement) => {
  let successTextElem: HTMLSpanElement;

  const btn = button({ onClick: onClick, style: 'margin: 0 1rem;' }, [
    span([text('Copy to Clipboard')]),
    (successTextElem = span([text('')]))
  ]);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(getTextContainerElem().value);
    } catch (err) {
      alert('Failed to copy to clipboard');
      return;
    }
    
    successTextElem.textContent = ' ✅';
    await waitMs(2000);
    successTextElem.textContent = '';
  }

  return btn;
};

export const appList = () =>
  ul([
    li([
      a({ href: randomizeLinesRoute.pathname }, [text('Randomize (Shuffle) Lines')]),
    ]),
    li([
      a({ href: removeEmptyLinesRoute.pathname }, [text('Remove Empty Lines')]),
    ]),
    li([
      a({ href: removeDuplicateLinesRoute.pathname }, [text('Remove Duplicate Lines')]),
    ]),
    li([
      a({ href: sortLinesRoute.pathname }, [text('Sort Lines')]),
    ]),
  ]);