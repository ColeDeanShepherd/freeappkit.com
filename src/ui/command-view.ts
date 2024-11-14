import { trackCommandRun } from '../analytics';
import { translate } from '../localization';
import { Route } from '../router';
import { copyToClipboardButton } from '../ui/ui-components';
import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label, textInput } from '../ui/lib/ui-core';
import { openFilePicker, saveStringToFile } from '../fileSystemUtil';
import { ICommand, ICommandParameter, IType, mkDefaultArgs } from '../command';

function mkArgView(
  param: ICommandParameter,
  args: { [key: string]: any },
  onArgsChange?: (args: { [key: string]: any }) => void
) {
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
        
        function onInput(e: Event) {
          args[param.name] = (e.target as HTMLTextAreaElement).value;
          onArgsChange?.(args);
        }

        function setValue(newValue: string) {
          _textArea.value = newValue;
          args[param.name] = newValue;
          onArgsChange?.(args);
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
        
        function onInput(e: Event) {
          const valueStr = (e.target as HTMLTextAreaElement).value;
          const value = parseInt(valueStr);

          if (!isNaN(value)) {
            args[param.name] = value;
            onArgsChange?.(args);
          }
        }

        return div({ style: containerStyle }, [
          label([text(param.description ?? '')]),
          textInput({ onInput, value: defaultValue.toString() }),
        ]);
      }

    default:
      return text('Unknown type');
  }

  function onChange(e: Event) {
    args[param.name] = (e.target as HTMLInputElement).checked;
    onArgsChange?.(args);
  }
}

export const commandArgsView = (
  parameters: ICommandParameter[],
  args: { [key: string]: any },
  onArgsChange?: (args: { [key: string]: any }) => void
) => {
  const paramsView = div(
    parameters.map(param => div([
      mkArgView(param, args, onArgsChange)
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

export interface CommandViewProps {
  autoRunOnArgChange: boolean;
}

export const mkCommandView = (command: ICommand, props: CommandViewProps) => {
  let args: { [key: string]: any } = mkDefaultArgs(command.parameters);
  const [returnValueNode, updateReturnVal] = mkReturnValueView(command.returnType)

  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    commandArgsView(command.parameters, args, onArgsChange),
    !props.autoRunOnArgChange
      ? button({ onClick: onSubmit }, [text(command.name)])
      : span(),
    returnValueNode,
  ]);

  return page;

  function onArgsChange() {
    if (props.autoRunOnArgChange) {
      onSubmit();
    }
  }

  function onSubmit() {
    const returnVal = command.runFn(args);
    trackCommandRun(command, args); // TODO: disable because we send an event every keypress?
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

export const mkDefaultCommandViewProps = (): CommandViewProps => {
  return {
    autoRunOnArgChange: true
  };
}

export const mkRouteFromCommand = (command: ICommand, viewProps?: CommandViewProps): Route => {
  return {
    pathname: getCommandPathName(command),
    title: command.name,
    mkPageElem: () => mkCommandView(command, viewProps ?? mkDefaultCommandViewProps())
  };
}