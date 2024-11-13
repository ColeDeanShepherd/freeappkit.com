import { trackCommandRun } from '../analytics';
import { translate } from '../localization';
import { Route } from '../router';
import { copyToClipboardButton } from '../ui/ui-components';
import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label, textInput } from '../ui/lib/ui-core';
import { openFilePicker, saveStringToFile } from '../util';
import { ICommand, ICommandParameter, IType, mkDefaultArgs } from '../command';

function mkArgView(param: ICommandParameter, args: { [key: string]: any }) {
  const containerStyle = 'margin-bottom: 1rem';

  switch (param.type.kind) {
    case 'text':
      {
        let _textArea: HTMLTextAreaElement;
        const defaultValue = param.defaultValue ?? '';

        return div({ style: containerStyle }, [
          h3([text(translate(param.description ?? ''))]),
          (_textArea = textArea({ onInput, value: defaultValue, style: 'min-height: 300px' })),
          div({ class: 'button-bar', style: 'margin-bottom: 1rem;' }, [
            button({ onClick: loadFromFile }, [ text('Load from file') ]),
            button({ onClick: clear }, [ text('Clear') ]),
          ]),
        ]);

        function setValue(newValue: string) {
          _textArea.value = newValue;
          args[param.name] = newValue;
        }

        function loadFromFile() {
          openFilePicker()
            .then(file => {
              if (file) {
                file.text()
                  .then(contents => setValue(contents))
                  .catch(err => alert(`Error reading file: ${err}`));
              }
            })
            .catch(err => alert(`Error opening file: ${err}`));
        }

        function clear() {
          setValue('');
        }
      }

    case 'bool':
      {
        const defaultValue = param.defaultValue ?? false;
        return div({ style: containerStyle }, [
          checkbox({ checked: defaultValue, onChange }),
          label([text(param.description ?? '')]),
        ]);
      }
    
    case 'number':
      {
        const defaultValue = param.defaultValue ?? 0;
        return div({ style: containerStyle }, [
          label([text(param.description ?? '')]),
          textInput({ onInput, value: defaultValue.toString() }),
        ]);
      }

    default:
      return text('Unknown type');
  }

  function onInput(e: Event) {
    args[param.name] = (e.target as HTMLTextAreaElement).value;
  }

  function onChange(e: Event) {
    args[param.name] = (e.target as HTMLInputElement).checked;
  }
}

export const commandArgsView = (parameters: ICommandParameter[], args: { [key: string]: any }) => {
  const paramsView = div(
    parameters.map(param => div([
      mkArgView(param, args)
    ]))
  );

  return paramsView;
};

function mkReturnValueView(returnType: IType): [node: Node, updateValue: (value: any) => void] {
  switch (returnType.kind) {
    case 'text':
      {
        let returnValueElem: Element;
        let outputElem: HTMLTextAreaElement;

        returnValueElem =  div([
          h3([
            span({ style: "margin-right: 1rem;"}, [ text('Output') ]),
            div({ class: 'button-bar', style: 'display: inline' }, [
              copyToClipboardButton(() => outputElem),
              button({ onClick: saveToFile }, [ text('Save to file') ])
            ])
          ]),
          (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
        ]);

        return [returnValueElem, (value) => outputElem.value = value];

        
        function saveToFile() {
          const filename = prompt('Enter a filename:', 'New Document') + '.txt';
          saveStringToFile(outputElem.value, filename, "text/plain");
        }
      }
    
    case 'number':
      {
        let numberElem: Element;
        let outputElem: HTMLInputElement;

        numberElem = div([
          h3([ text('Output') ]),
          (outputElem = textInput({ value: '0', disabled: true })),
        ]);

        return [numberElem, (value) => outputElem.value = value.toString()];
      }

    default:
      return [text('Unknown type'), () => {}];
  }
}

export const mkCommandView = (command: ICommand) => {
  let args: { [key: string]: any } = mkDefaultArgs(command.parameters);
  const [returnValueNode, updateReturnVal] = mkReturnValueView(command.returnType)

  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    commandArgsView(command.parameters, args),
    button({ onClick: onSubmit }, [text(command.name)]),
    returnValueNode,
  ]);

  return page;

  function onSubmit() {
    const returnVal = command.runFn(args);
    trackCommandRun(command, args);
    updateReturnVal(returnVal);
  }
}

export const getCommandPathName = (command: ICommand) => {
  if (command.pathname) {
    return command.pathname;
  } else {
    return '/' + translate(command.name).toLowerCase().replace(/ /g, '-');
  }
}

export const mkRouteFromCommand = (command: ICommand): Route => {
  return {
    pathname: getCommandPathName(command),
    title: command.name,
    mkPageElem: () => mkCommandView(command)
  };
}