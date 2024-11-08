import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, select, option } from './ui-core';
import { Route } from './router';
import { commands } from './commands';
import { commandArgsView, ICommand, mkDefaultArgs } from './command';

const applicableCommands = commands.filter(c =>
  c.parameters.length >= 1 &&
  c.parameters[0].type.kind === 'text' &&
  c.returnType.kind === 'text'
);

const mkPageElem = () => {
  let curCommand: ICommand | undefined = undefined;
  let curCommandArgs: { [key: string]: any } = {};

  let curCommandArgsView: HTMLDivElement;
  let curCommandSubmitButton: HTMLButtonElement;
  let curTextArea: HTMLTextAreaElement;

  const page = div([
    h2([
      text('Plain Text Editor')
    ]),
    p([text('Edit plain-text with our advanced web tool. Enter your text below and select a tool to apply.')]),
    div([
      div({ style: "margin-bottom: 1rem;" }, [
        text('Select a tool: '),
        select({ value: '', onChange: onCommandChange }, [
          option({ value: '' }, [text('')]),
          ...applicableCommands.map(c => option({ value: c.name }, [text(c.name)]))
        ]),
      ]),
      (curCommandArgsView = div({ style: 'margin-bottom: 1rem' })),
      (curTextArea = textArea({ style: 'min-height: 300px' }))
    ])
  ]);

  function onCommandChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const selectedCommand = applicableCommands.find(c => c.name === target.value);

    if (selectedCommand) {
      curCommand = selectedCommand;
      
      const paramsTail = selectedCommand.parameters.slice(1);
      curCommandArgs = mkDefaultArgs(selectedCommand.parameters);
      curCommandArgsView.replaceChildren(commandArgsView(paramsTail, curCommandArgs));
      curCommandArgsView.appendChild(button({ onClick: onSubmit }, [text(selectedCommand.name)]));
    }
  }

  function onSubmit() {
    if (curCommand) {
      curCommandArgs[curCommand.parameters[0].name] = curTextArea.value;
      const returnValue = curCommand.runFn(curCommandArgs);
      curTextArea.value = returnValue;
    }
  }

  return page;
}

export const route: Route = {
  pathname: '/plain-text-editor',
  title: 'Plain Text Editor',
  mkPageElem: mkPageElem,
};