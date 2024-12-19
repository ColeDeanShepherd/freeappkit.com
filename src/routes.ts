import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, img, select, option, header, textInput } from './framework/ui/ui-core';
import { Route } from './framework/router';
import * as plainTextEditor from './ui/plain-text-editor';
import { appList, languageList } from './ui/ui-components';
import { commands, frontPageCommands, generateGuidsCommand, randomizeLinesCommand, videoGameIdeaGeneratorCommand } from './commands';
import { CommandViewProps, mkRouteFromCommand } from './ui/command-view';
import { translate } from './framework/localization';
import * as allApps from './ui/all-apps';

// #region Pages

const mkHomePage = () =>
  div([
    div([
      h3([text('Our apps:')]),
      appList(frontPageCommands),
      a({ href: translate(allApps.route.pathname) }, [text('All apps...')])
    ]),
    div([
      h3([text('Supported languages:')]),
      languageList()
    ])
  ]);

  function mkNotFoundPage() {
    return text('Page not found!');
  }

// #endregion Pages

export const notFoundRoute: Route = {
  pathname: '/page-not-found',
  title: 'Page Not Found',
  mkPageElem: mkNotFoundPage,
};

const commandViewPropsOverrides = [
  {
    command: randomizeLinesCommand,
    viewProps: {
      autoRunOnArgChange: false
    } as CommandViewProps
  },
  {
    command: generateGuidsCommand,
    viewProps: {
      autoRunOnArgChange: false
    } as CommandViewProps
  },
  {
    command: videoGameIdeaGeneratorCommand,
    viewProps: {
      autoRunOnArgChange: false
    } as CommandViewProps
  }
];

export const routes: Route[] = [
  {
    pathname: '/',
    title: undefined,
    mkPageElem: mkHomePage,
  },
  
  allApps.route,
  plainTextEditor.route,
  ...commands.map(c => {
    const viewProps = commandViewPropsOverrides.find(o => o.command === c)?.viewProps;
    return mkRouteFromCommand(c, viewProps);
  })
  //...plainTextEditor.plainTextEditorCommands.map(plainTextEditor.mkRouteFromPlainTextEditorCommand),
  //...commands.except(plainTextEditor.plainTextEditorCommands).map(mkRouteFromCommand)
];