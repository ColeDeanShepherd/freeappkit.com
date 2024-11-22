import Decimal from 'decimal.js';
import { MaybeLocalizedString } from './framework/localization';

export interface NamedValue {
  name: string;
  type: IType
  description?: string;
}

interface BoolType {
  kind: 'bool';
}

interface TextType {
  kind: 'text';
}

interface NumberType {
  kind: 'number';
}

interface ObjectType {
  kind: 'object';
  properties: NamedValue[];
}

export type IType = BoolType | TextType | NumberType | ObjectType;

export interface ICommand {
  name: MaybeLocalizedString;
  pathname?: MaybeLocalizedString;
  description: MaybeLocalizedString;
  parameters: ICommandParameter[];
  returnType: IType;
  runFn: (args: { [key: string]: any }) => any;
  mkSeoContent?: () => Node;
  mkCommandViewOverride?: () => Node;
  mkArgsViewOverride?: (
    parameters: ICommandParameter[],
    args: { [key: string]: any },
    onArgsChange: (args: { [key: string]: any }) => void
  ) => Node;
}

export interface ICommandParameter extends NamedValue {
  defaultValue?: any;
}

export const getDefaultValue = (type: IType) => {
  switch (type.kind) {
    case 'bool':
      return false;
    case 'text':
      return '';
    case 'number':
      return new Decimal(0);
    default:
      return undefined;
  }
}

export const mkDefaultArgs = (parameters: ICommandParameter[]) => {
  let args: { [key: string]: any } = {};

  for (const param of parameters) {
    args[param.name] = param.defaultValue ?? getDefaultValue(param.type);
  }

  return args;
}