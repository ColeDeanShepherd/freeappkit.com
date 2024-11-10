import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span } from './ui-core';
import { Route } from './router';
import { commands } from './commands';
import { commandArgsView, getCommandPathName, ICommand, mkDefaultArgs } from './command';
import { openFilePicker, saveStringToFile } from './util';
import { copyToClipboardButton } from './ui-components';

export const plainTextEditorCommands = commands.filter(c =>
  c.parameters.length >= 1 &&
  c.parameters[0].type.kind === 'text' &&
  c.returnType.kind === 'text'
);

export const mkPlainTextEditorCommandView = (command: ICommand) => {
  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    mkPlainTextEditorView(command)
  ]);

  return page;
};

export const mkRouteFromPlainTextEditorCommand = (command: ICommand): Route => {
  return {
    pathname: getCommandPathName(command),
    title: command.name,
    mkPageElem: () => mkPlainTextEditorCommandView(command)
  };
}

export const mkPageElem = () => {
  const page = div([
    h2([
      text('Plain Text Editor')
    ]),
    p([text('Edit plain-text with our advanced web tool. Enter your text below and select a tool to apply.')]),
    mkPlainTextEditorView()
  ]);

  return page;
};

export const mkPlainTextEditorView = (preSelectedCommand: ICommand | undefined = undefined) => {
  let curCommand: ICommand | undefined = undefined;
  let curCommandArgs: { [key: string]: any } = {};

  let curCommandArgsView: HTMLDivElement;
  let curTextArea: HTMLTextAreaElement;

  let fileDropdownMenu: HTMLDivElement;
  let editDropdownMenu: HTMLDivElement;

  const page = div([
    div({ style: "margin-bottom: 1rem;" }, [
      div({ class: 'toolbar' }, [
        div({ style: 'position: relative' }, [
          button({ onClick: toggleFileMenu }, [ span([ text('File '), i({ class: 'bi bi-chevron-down' }) ]) ]),
          (fileDropdownMenu = div({ class: 'dropdown-menu hidden' }, [
            ul([
              li({ onClick: () => onFileMenuOptionClick(newFile) }, [ text('New') ]),
              li({ onClick: () => onFileMenuOptionClick(openFile) }, [ text('Open') ]),
              li({ onClick: () => onFileMenuOptionClick(saveToFile) }, [ text('Save As') ]),
            ])
          ]))
        ]),
        div({ style: 'position: relative' }, [
          button({ onClick: toggleEditMenu }, [ span([ text('Tools '), i({ class: 'bi bi-chevron-down' }) ]) ]),
          (editDropdownMenu = div({ class: 'dropdown-menu hidden' }, [
            ul([
              ...plainTextEditorCommands.map(c =>
                li({
                  onClick: () => onEditMenuOptionClick(() => { onCommandChange({ target: { value: c.name } } as any) })
                }, [ text(c.name) ]))
            ])
          ]))
        ]),
        div([
          copyToClipboardButton(() => curTextArea)
        ])
      ])
    ]),
    (curCommandArgsView = div({ style: 'margin-bottom: 1rem' })),
    (curTextArea = textArea({ style: 'min-height: 300px' }))
  ]);

  if (preSelectedCommand) {
    onCommandChangeInternal(preSelectedCommand);
  }

  function toggleFileMenu() {
    fileDropdownMenu.classList.toggle('hidden');
    editDropdownMenu.classList.add('hidden');
  }

  function onFileMenuOptionClick(fn: () => void) {
    fileDropdownMenu.classList.add('hidden');
    fn();
  }

  function onEditMenuOptionClick(fn: () => void) {
    editDropdownMenu.classList.add('hidden');
    fn();
  }

  function newFile() {
    curTextArea.value = '';
  }

  function openFile() {
    openFilePicker()
      .then(file => {
        if (file) {
          file.text()
            .then(contents => curTextArea.value = contents)
            .catch(err => alert(`Error reading file: ${err}`));
        }
      })
      .catch(err => alert(`Error opening file: ${err}`));
  }

  function saveToFile() {
    const filename = prompt('Enter a filename:', 'New Document') + '.txt';
    saveStringToFile(curTextArea.value, filename, "text/plain");
  }

  function toggleEditMenu() {
    editDropdownMenu.classList.toggle('hidden');
    fileDropdownMenu.classList.add('hidden');
  }

  function onCommandChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const selectedCommand = plainTextEditorCommands.find(c => c.name === target.value);

    if (selectedCommand) {
      onCommandChangeInternal(selectedCommand);
    }
  }

  function onCommandChangeInternal(selectedCommand: ICommand) {
    curCommand = selectedCommand;
    
    const paramsTail = selectedCommand.parameters.slice(1);
    curCommandArgs = mkDefaultArgs(selectedCommand.parameters);
    curCommandArgsView.innerHTML = '';
    //curCommandArgsView.replaceChildren(h3([text(selectedCommand.name)]));
    curCommandArgsView.append(commandArgsView(paramsTail, curCommandArgs));
    curCommandArgsView.appendChild(button({ onClick: onSubmit }, [text(selectedCommand.name)]));
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