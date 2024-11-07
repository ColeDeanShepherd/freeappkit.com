import { copyToClipboardButton } from './ui-components';
import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label } from './ui-core';

interface BoolType {
  kind: 'bool';
}

interface TextType {
  kind: 'text';
}

export type IType = BoolType | TextType;

export interface ICommand {
  name: string;
  description: string;
  parameters: ICommandParameter[];
  returnType: IType;
  runFn: (args: { [key: string]: any }) => any;
}

export interface ICommandParameter {
  name: string;
  type: IType
  description?: string;
  defaultValue?: any;
}

export const getDefaultValue = (type: IType) => {
  switch (type.kind) {
    case 'bool':
      return false;
    case 'text':
      return '';
  }
}

export const mkCommandView = (command: ICommand) => {
  let args: { [key: string]: any } = {};

  for (const param of command.parameters) {
    args[param.name] = param.defaultValue ?? getDefaultValue(param.type);
  }

  function mkArgView(param: ICommandParameter) {
    const containerStyle = 'margin-bottom: 1rem';

    switch (param.type.kind) {
      case 'text':
        {
          const defaultValue = param.defaultValue ?? '';
          return div({ style: containerStyle }, [
            h3([text(param.description ?? '')]),
            textArea({ onInput, value: defaultValue, style: 'min-height: 300px' }),
          ]);
        }

      case 'bool':
        {
          const defaultValue = param.defaultValue ?? false;
          return div({ style: containerStyle }, [
            checkbox({ checked: defaultValue, onChange }),
            label([text(param.description ?? '')]),
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

  function mkReturnValueView(returnType: IType): [node: Node, updateValue: (value: any) => void] {
    switch (returnType.kind) {
      case 'text':
        let returnValueElem: Element;
        let outputElem: HTMLTextAreaElement;

        returnValueElem =  div([
          h3([
            text('Output'),
            copyToClipboardButton(() => outputElem)
          ]),
          (outputElem = textArea({ readonly: true, style: 'min-height: 300px' })),
        ]);

        return [returnValueElem, (value) => outputElem.value = value];

      default:
        return [text('Unknown type'), () => {}];
    }
  }

  const paramsView = div(
    command.parameters.map(param => div([
      mkArgView(param)
    ]))
  );

  const [node, updatReturnVal] = mkReturnValueView(command.returnType)

  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    paramsView,
    button({ onClick: onSubmit }, [text(command.name)]),
    node,
  ]);

  return page;

  function onSubmit() {
    const returnVal = command.runFn(args);
    updatReturnVal(returnVal);
  }
}

export const mkRouteFromCommand = (command: ICommand) => {
  return {
    pathname: '/' + command.name.toLowerCase().replace(/ /g, '-'),
    title: command.name,
    mkPageElem: () => mkCommandView(command)
  };
}