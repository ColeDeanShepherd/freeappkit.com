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

export const convertToLowerCaseCommand: ICommand = {
  name: "Convert to Lowercase",
  description: "Convert text to lowercase with this free online lowercase converter. Simply paste your text into the 1st box below and click the \"Convert to lowercase\" button, then copy the output from the 2nd box below.",
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
  name: "Convert to Uppercase",
  description: "Convert text to uppercase with this free online uppercase converter. Simply paste your text into the 1st box below and click the \"Convert to uppercase\" button, then copy the output from the 2nd box below.",
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
  description: "Base64 encode text with this free online tool. Simply paste your text into the 1st box below and click the \"Base64 Encode\" button, then copy the output from the 2nd box below.",
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
  description: "Base64 decode text with this free online tool. Simply paste your text into the 1st box below and click the \"Base64 Decode\" button, then copy the output from the 2nd box below.",
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
  description: "Count characters with this free online tool. Simply paste your text into the 1st box below and click the \"Count Characters\" button, then copy the output from the 2nd box below.",
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
  description: "Count words with this free online tool. Simply paste your text into the 1st box below and click the \"Count Words\" button, then copy the output from the 2nd box below.",
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

export const countSentencesCommand: ICommand = {
  name: "Count Sentences",
  description: "Count sentences with this free online tool. Simply paste your text into the 1st box below and click the \"Count Sentences\" button, then copy the output from the 2nd box below.",
  parameters: [
    {
      name: "text",
      type: { kind: 'number' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => args['text'].split(/[.!?]/).filter((s: string) => s.length > 0).length.toString(),
};

export const urlEncodeCommand: ICommand = {
  name: "URL Encode",
  description: "URL encode text with this free online tool. Simply paste your text into the 1st box below and click the \"URL Encode\" button, then copy the output from the 2nd box below.",
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
  description: "URL decode text with this free online tool. Simply paste your text into the 1st box below and click the \"URL Decode\" button, then copy the output from the 2nd box below.",
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
  description: "Add text to the end of each line with this free online tool. Simply paste your text into the 1st box below, type the text you want to add into the 2nd box below, click the \"Add to End of Each Line\" button, then copy the output from the 3rd box below.",
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
  countSentencesCommand,
  urlEncodeCommand,
  urlDecodeCommand,
  addToEndOfEachLineCommand
];