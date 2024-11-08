import { copyToClipboardButton } from './ui-components';
import { text, h1, h2, h3, h4, div, p, ul, li, a, textArea, button, i, span, checkbox, label, textInput } from './ui-core';

interface BoolType {
  kind: 'bool';
}

interface TextType {
  kind: 'text';
}

interface NumberType {
  kind: 'number';
}

export type IType = BoolType | TextType | NumberType;

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

function mkArgView(param: ICommandParameter, args: { [key: string]: any }) {
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

export const mkDefaultArgs = (parameters: ICommandParameter[]) => {
  let args: { [key: string]: any } = {};

  for (const param of parameters) {
    args[param.name] = param.defaultValue ?? getDefaultValue(param.type);
  }

  return args;
}

export const commandArgsView = (parameters: ICommandParameter[], args: { [key: string]: any }) => {
  const paramsView = div(
    parameters.map(param => div([
      mkArgView(param, args)
    ]))
  );

  return paramsView;
};

export const mkCommandView = (command: ICommand) => {
  let args: { [key: string]: any } = mkDefaultArgs(command.parameters);

  function mkReturnValueView(returnType: IType): [node: Node, updateValue: (value: any) => void] {
    switch (returnType.kind) {
      case 'text':
        {
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
        }
      
      case 'number':
        {
          let numberElem: Element;
          let outputElem: HTMLParagraphElement;

          numberElem = div([
            h3([ text('Output') ]),
            (outputElem = p([ text('') ])),
          ]);

          return [numberElem, (value) => outputElem.innerText = value.toString()];
        }

      default:
        return [text('Unknown type'), () => {}];
    }
  }

  const [node, updatReturnVal] = mkReturnValueView(command.returnType)

  const page = div([
    h2([
      text(command.name)
    ]),
    p([text(command.description)]),
    commandArgsView(command.parameters, args),
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