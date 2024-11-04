import { text, button, i, span } from './ui-core';
import "bootstrap-icons/font/bootstrap-icons.css";
import { waitMs } from './util';

export const copyToClipboardButton = (getTextContainerElem: () => HTMLTextAreaElement) => {
  let successTextElem: HTMLSpanElement;

  const btn = button({ onClick: onClick, style: 'margin: 0 1rem;' }, [
    i({ class: 'bi bi-clipboard' }),
    (successTextElem = span([text('')]))
  ]);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(getTextContainerElem().value);
    } catch (err) {
      alert('Failed to copy to clipboard');
      return;
    }
    
    successTextElem.textContent = ' Copied to clipboard!';
    await waitMs(2000);
    successTextElem.textContent = '';
  }

  return btn;
};