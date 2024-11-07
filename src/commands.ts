import { shuffleLines, removeEmptyLines, sortLines } from './util';
import { ICommand } from './command';

export const randomizeLinesCommand: ICommand = {
  name: "Randomize Lines",
  description: "Randomize/shuffle lines of text with this free online tool. Simply paste your text/list into the 1st box below and click the \"Randomize\" button, then copy the randomized lines from the 2nd box below.",
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => shuffleLines(args['text']),
};

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

export const commands = [
  randomizeLinesCommand,
  removeEmptyLinesCommand,
  sortLinesCommand
];