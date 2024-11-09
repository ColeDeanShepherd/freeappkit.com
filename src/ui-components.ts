import { text, button, i, span, ul, li, a } from './ui-core';
import "bootstrap-icons/font/bootstrap-icons.css";
import { waitMs } from './util';
import { removeDuplicateLinesRoute } from './remove-duplicate-lines';
import { commands } from './commands';
import { mkRouteFromCommand } from './command';
import * as plainTextEditor from './plain-text-editor';

export const copyToClipboardButton = (getTextContainerElem: () => HTMLTextAreaElement) => {
  let successTextElem: HTMLSpanElement;

  const btn = button({ onClick: onClick }, [
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
    li([
      a({ href: plainTextEditor.route.pathname }, [text('Plain-Text Editor')]),
    ]),
    ...commands.map(c => li([
      a({ href: mkRouteFromCommand(c).pathname }, [text(c.name)])
    ]))
  ]);