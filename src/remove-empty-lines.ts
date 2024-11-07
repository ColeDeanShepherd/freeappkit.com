import { removeEmptyLines } from './util';
import { ICommand, mkRouteFromCommand } from './command';

export const removeEmptyLinesCommand: ICommand = {
  name: "Remove Empty Lines",
  description: "Remove empty/blank lines of text with this free online tool. Simply paste your text/list into the 1st box below and click the \"Remove empty lines\" button, then copy the output from the 2nd box below.",
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    },
    {
      name: "Also remove lines of blank characters",
      type: { kind: 'bool' },
      description: "Also remove lines of blank characters"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => removeEmptyLines(args['text'], args['Also remove lines of blank characters']),
};

export const removeEmptyLinesRoute = mkRouteFromCommand(removeEmptyLinesCommand);