import { MaybeLocalizedString } from './localization';

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
  name: MaybeLocalizedString;
  pathname?: MaybeLocalizedString;
  description: MaybeLocalizedString;
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

export const mkDefaultArgs = (parameters: ICommandParameter[]) => {
  let args: { [key: string]: any } = {};

  for (const param of parameters) {
    args[param.name] = param.defaultValue ?? getDefaultValue(param.type);
  }

  return args;
}