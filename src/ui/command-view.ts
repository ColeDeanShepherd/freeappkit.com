import { trackCommandRun } from '../framework/analytics';
import { translate } from '../framework/localization';
import { Route } from '../framework/router';
import { copyToClipboardButton } from '../ui/ui-components';
import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label, textInput } from '../framework/ui/ui-core';
import { openFilePicker, saveStringToFile } from '../framework/fileSystemUtil';
import { ICommand, ICommandParameter, IType, mkDefaultArgs, NamedValue } from '../command';

export function mkArgView(
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
          label([text((param.description !== undefined) ? (param.description + ' ') : '')]),
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
        let outputElem: HTMLInputElement;

        const numberElem = div([
          (outputElem = textInput({ value: '0', disabled: true })),
        ]);

        return [numberElem, (value) => outputElem.value = value.toString()];
      }
    
    case 'object':
      {
        const objPropElemsAndUpdateValueFns: [NamedValue, HTMLElement, (value: any) => void][] =
          returnType.properties.map(prop => {
            const [elem, updateValue] = mkReturnValueView(prop.type);

            return [
              prop,
              div([
                label([text(prop.description ?? '')]),
                elem
              ]),
              updateValue
            ];
          });

        const objElem = div({ class: 'rounded-bordered flex-left-to-right-wrap' }, [
          ...objPropElemsAndUpdateValueFns.map(([_1, elem, _2]) => elem)
        ]);

        const updateValue = (value: any) => {
          objPropElemsAndUpdateValueFns.forEach(([prop, _1, updateValue]) => {
            updateValue(value[prop.name]);
          });
        };

        return [objElem, updateValue];
      }

    default:
      return [text('Unknown type'), () => {}];
  }
}

export interface CommandViewProps {
  autoRunOnArgChange: boolean;
}

export const mkCommandView = (command: ICommand, props: CommandViewProps) => {
  if (command.mkCommandViewOverride) {
    return command.mkCommandViewOverride();
  }

  let args: { [key: string]: any } = mkDefaultArgs(command.parameters);
  const [returnValueNode, updateReturnVal] = mkReturnValueView(command.returnType)

  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    !command.mkArgsViewOverride
      ? commandArgsView(command.parameters, args, onArgsChange)
      : command.mkArgsViewOverride(command.parameters, args, onArgsChange),
    !props.autoRunOnArgChange
      ? button({ onClick: onSubmit }, [text(command.name)])
      : span(),
    div([
      h3([text('Output')]),
      returnValueNode
    ]),
    (command.mkSeoContent !== undefined)
      ? div([command.mkSeoContent()])
      : span()
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
    return '/' + translate(command.name).toLowerCase().replace(/[ /]/g, '-').replace(/([\(\)])|(---)/g, '-');
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