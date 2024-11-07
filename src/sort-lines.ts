import { sortLines } from './util';
import { ICommand, mkRouteFromCommand } from './command';

export const sortLinesCommand: ICommand = {
  name: "Sort Lines",
  description: "Sort lines of text with this free online tool. Simply paste your text/list into the 1st box below, configure the tool using the checkboxes, click the \"Sort\" button, then copy the output from the 2nd box below.",
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    },
    {
      name: "Descending Order",
      description: "Sort in descending order",
      type: { kind: 'bool' }
    },
    {
      name: "Case Sensitive",
      description: "Sort case-sensitively",
      type: { kind: 'bool' },
      defaultValue: true
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => sortLines(args['text'], args['Descending Order'], args['Case Sensitive']),
};

export const sortLinesRoute = mkRouteFromCommand(sortLinesCommand);
