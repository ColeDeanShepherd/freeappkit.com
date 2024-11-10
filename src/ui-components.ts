import { text, button, i, span, ul, li, a } from './ui-core';
import "bootstrap-icons/font/bootstrap-icons.css";
import { getDomainNameWithoutSubdomains, waitMs } from './util';
import { removeDuplicateLinesRoute } from './remove-duplicate-lines';
import { commands } from './commands';
import { mkRouteFromCommand } from './command';
import * as plainTextEditor from './plain-text-editor';
import { getSubdomainForLocale, languageCodeToName, supportedLanguages, translate } from './localization';

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
      a({ href: translate(removeDuplicateLinesRoute.pathname) }, [text('Remove Duplicate Lines')]),
    ]),
    li([
      a({ href: translate(plainTextEditor.route.pathname) }, [text('Plain-Text Editor')]),
    ]),
    ...commands.map(c => li([
      a({ href: translate(mkRouteFromCommand(c).pathname) }, [text(c.name)])
    ]))
  ]);

export const languageList = () => {
  const domainName = getDomainNameWithoutSubdomains();
  const protocol = window.location.protocol;

  return ul([
    ...supportedLanguages.map(lang => {
      const subdomain = getSubdomainForLocale(lang);
      const url = (subdomain === undefined) ? `${protocol}//${domainName}` : `${protocol}//${subdomain}.${domainName}`;

      return li([
        a({ href: url }, [text(languageCodeToName[lang])])
      ]);
    })
  ]);
}