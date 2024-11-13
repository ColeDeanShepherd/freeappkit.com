import { shuffleLines, removeEmptyLines, sortLines } from './textUtil';
import { ICommand } from './command';
import { strings } from './strings';

export const randomizeLinesCommand: ICommand = {
  name: "Randomize Lines",
  description: strings.randomizeLinesDescription,
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
  description: strings.removeEmptyLinesDescription,
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
  description: strings.sortLinesDescription,
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
      name: "Ignore Case",
      description: "Ignore case",
      type: { kind: 'bool' },
      defaultValue: true
    },
    {
      name: "Delete Empty Lines",
      description: "Delete empty lines",
      type: { kind: 'bool' },
      defaultValue: false
    },
    {
      name: "Trim Lines Before Sorting",
      description: "Trim lines before sorting",
      type: { kind: 'bool' },
      defaultValue: false
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => sortLines(
    args['text'],
    args['Descending Order'],
    !args['Ignore Case'],
    args['Delete Empty Lines'],
    args['Trim Lines Before Sorting']
  ),
};

export const convertToLowerCaseCommand: ICommand = {
  name: "Convert to Lowercase",
  description: strings.convertToLowerCaseDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => args['text'].toLowerCase(),
};

export const convertToUpperCaseCommand: ICommand = {
  name: strings.convertToUpperCase,
  pathname: strings.convertToUpperCasePath,
  description: strings.convertToUpperCaseDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => args['text'].toUpperCase(),
};

export const base64EncodeCommand: ICommand = {
  name: "Base64 Encode",
  description: strings.base64EncodeDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => btoa(args['text']),
};

export const base64DecodeCommand: ICommand = {
  name: "Base64 Decode",
  description: strings.base64DecodeDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => atob(args['text']),
};

export const countCharactersCommand: ICommand = {
  name: "Count Characters",
  description: strings.countCharactersDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'number' },
  runFn: (args) => args['text'].length.toString(),
};

export const countWordsCommand: ICommand = {
  name: "Count Words",
  description: strings.countWordsDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'number' },
  runFn: (args) => args['text'].split(/\s+/).length.toString(),
};

export const countLinesCommand: ICommand = {
  name: "Count Lines",
  description: strings.countLinesDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'number' },
  runFn: (args) => args['text'].split('\n').length.toString(),
};

export const countSentencesCommand: ICommand = {
  name: "Count Sentences",
  description: strings.countSentencesDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'number' },
  runFn: (args) => args['text'].split(/[.!?]/).filter((s: string) => s.length > 0).length.toString(),
};

export const urlEncodeCommand: ICommand = {
  name: "URL Encode",
  description: strings.urlEncodeDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => encodeURIComponent(args['text']),
};

export const urlDecodeCommand: ICommand = {
  name: "URL Decode",
  description: strings.urlDecodeDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => decodeURIComponent(args['text']),
};

export const addToEndOfEachLineCommand: ICommand = {
  name: "Add to End of Each Line",
  description: strings.addToEndOfEachLineDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    },
    {
      name: "textToAdd",
      type: { kind: 'text' },
      description: "Text to add"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => args['text'].split('\n').map((line: string) => line + args['textToAdd']).join('\n'),
};

export const jsonFormatterCommand: ICommand = {
  name: "JSON Formatter",
  description: strings.jsonFormatterDescription,
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your JSON below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => {
    try {
      return JSON.stringify(JSON.parse(args['text']), null, 2);
    } catch (e) {
      alert(`JSON is not valid. Error: ${e}`);
      return '';
    }
  },
};

export const commands = [
  randomizeLinesCommand,
  removeEmptyLinesCommand,
  sortLinesCommand,
  convertToLowerCaseCommand,
  convertToUpperCaseCommand,
  base64EncodeCommand,
  base64DecodeCommand,
  countCharactersCommand,
  countWordsCommand,
  countLinesCommand,
  countSentencesCommand,
  urlEncodeCommand,
  urlDecodeCommand,
  addToEndOfEachLineCommand,
  jsonFormatterCommand
];