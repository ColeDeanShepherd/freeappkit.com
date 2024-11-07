import { text, button, i, span, ul, li, a } from './ui-core';
import "bootstrap-icons/font/bootstrap-icons.css";
import { waitMs } from './util';
import { removeDuplicateLinesRoute } from './remove-duplicate-lines';
import { commands } from './commands';
import { mkRouteFromCommand } from './command';

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
      a({ href: 'https://keytune.io' }, [text('KeyTune - Learn to play songs on piano for free!')]),
    ]),
    li([
      a({ href: removeDuplicateLinesRoute.pathname }, [text('Remove Duplicate Lines')]),
    ]),
    ...commands.map(c => li([
      a({ href: mkRouteFromCommand(c).pathname }, [text(c.name)])
    ]))
  ]);