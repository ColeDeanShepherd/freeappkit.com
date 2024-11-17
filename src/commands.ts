import { shuffleLines, removeEmptyLines, sortLines, removeAccents, lines } from './framework/textUtil';
import { ICommand, IType } from './command';
import { strings } from './strings';
import { div, h2, h3, li, ol, p, text, ul } from './framework/ui/ui-core';

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

export const textCountsReturnType: IType = {
  kind: 'object',
  properties: [
    { name: 'numChars', type: { kind: 'number' }, description: 'Characters' },
    { name: 'numNonSpaceChars', type: { kind: 'number' }, description: 'Non-space characters' },
    { name: 'numWords', type: { kind: 'number' }, description: 'Words' },
    { name: 'numSentences', type: { kind: 'number' }, description: 'Sentences' },
    { name: 'numLines', type: { kind: 'number' }, description: 'Lines' },
    { name: 'numNonEmptyLines', type: { kind: 'number' }, description: 'Non-empty lines' }
  ]
};

export function getTextCounts(text: string) {
  return {
    numChars: text.length,
    numNonSpaceChars: text.replace(/\s/g, '').length,
    numWords: text.split(/\s+/).filter((x: string) => x.length > 0).length,
    numSentences: text.split(/[.!?\n]/).filter((s: string) => s.length > 0).length,
    numLines: text.split('\n').length,
    numNonEmptyLines: text.split('\n').filter((s: string) => s.length > 0).length
  };
}

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
  returnType: textCountsReturnType,
  runFn: (args) => getTextCounts(args['text']),
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
  returnType: textCountsReturnType,
  runFn: (args) => getTextCounts(args['text']),
  mkSeoContent: () => div([
    h2([ text("Free Online Word Counter Tool: Count Words and Text Metrics Effortlessly") ]),
    p([ text("Welcome to FreeAppKit's Word Counter, the ultimate free tool designed to help you analyze and optimize your text quickly and efficiently. Whether you're a writer, editor, student, or content creator, this tool offers an easy way to count words, characters, and more in seconds.") ]),

    h3([ text("Why Use Our Word Counter?") ]),
    p([ text("Text metrics matter in many scenarios, such as crafting essays, writing social media posts, or preparing professional documents. Knowing the exact number of words or characters can help you stay within limits or optimize your content for better readability.") ]),
    
    p([ text("Our word counter can be used by:") ]),
    ul([
      li([ text("Writers and Authors: Keep track of word counts for chapters, articles, and blogs.") ]),
      li([ text("Students and Academics: Ensure assignments and essays meet word count requirements.") ]),
      li([ text("Social Media Managers: Stay within character limits for Twitter, LinkedIn, or Instagram captions.") ]),
      li([ text("SEO Enthusiasts: Analyze content for optimal length to rank better in search engines.") ]),
    ]),

    h3([ text("Features") ]),
    p([ text("Our word counter tool can count more than just characters, it also counts words, sentences, and lines in real time as you type your text. Your privacy is important to us -- we do not store or share any text you input into the tool.") ]),

    h3([ text("How to Use the Word Counter") ]),
    p([ text("To use our free word counter tool, simply paste your text into the input box above. The tool will automatically count the number of characters, words, sentences, and lines in your text. You can also upload a text file by clicking \"Load from file\", or clear the text with the \"Clear\" button.") ]),
  ])
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
  returnType: textCountsReturnType,
  runFn: (args) => getTextCounts(args['text']),
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
  returnType: textCountsReturnType,
  runFn: (args) => getTextCounts(args['text']),
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
    },
    {
      name: "spacesPerIndent",
      type: { kind: 'number' },
      description: "Spaces per indent",
      defaultValue: 2
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => {
    try {
      return JSON.stringify(JSON.parse(args['text']), null, args['spacesPerIndent']);
    } catch (e) {
      return `JSON is not valid. Error: ${e}`;
    }
  },
  mkSeoContent: () => div([
    h2([ text("JSON Formatter - Free Online Tool to Format Your JSON Data") ]),
    p([ text("Welcome to Free App Kit’s JSON Formatter, your go-to tool for easily formatting JSON data. Whether you're a developer working on APIs, a data enthusiast parsing JSON files, or someone learning about JSON, our tool is here to help. It's fast, reliable, and completely free to use.") ]),

    h2([ text("Why Use a JSON Formatter?") ]),
    p([ text("JSON (JavaScript Object Notation) is widely used for transmitting data in web applications, APIs, and more. However, JSON data can sometimes be compact or minified, making it hard to read and debug. A JSON Formatter makes the data human-readable by adding proper indentation and line breaks.") ]),
    p([ text("With our JSON Formatter, you can quickly and efficiently format your JSON data, saving time and reducing errors. Plus, you can choose the number of spaces per indent to match your preferred style.") ]),

    h2([ text("Features of Our JSON Formatter Tool") ]),
    ul([
      li([ text("Free and easy to use with no signup required.") ]),
      li([ text("Format JSON instantly by pasting your data or uploading a file.") ]),
      li([ text("Adjustable spaces per indent to customize the output.") ]),
      li([ text("Copy formatted JSON to your clipboard with a single click.") ]),
      li([ text("Download the formatted JSON as a file for offline use.") ]),
      li([ text("Works entirely in your browser for privacy and security.") ])
    ]),

    h2([ text("How to Use the JSON Formatter") ]),
    ol([
      li([ text("Paste your JSON data into the text area or load it from a file.") ]),
      li([ text("Set your preferred number of spaces per indent (default is 2).") ]),
      li([ text("Click the 'Format' button to format your JSON.") ]),
      li([ text("Copy the formatted JSON to your clipboard or save it as a file.") ]),
      li([ text("Enjoy cleaner, more readable JSON data!") ])
    ]),

    h2([ text("Who Can Benefit from This Tool?") ]),
    p([ text("Our JSON Formatter is perfect for:") ]),
    ul([
      li([ text("Web developers debugging API responses or working on front-end/back-end integration.") ]),
      li([ text("Data analysts processing JSON data from various sources.") ]),
      li([ text("Students learning about JSON in programming or data science courses.") ]),
      li([ text("Anyone working with JSON who wants a simple and effective formatting tool.") ])
    ]),

    h2([ text("Frequently Asked Questions") ]),
    h3([ text("Is this tool free to use?") ]),
    p([ text("Yes! The JSON Formatter is completely free. There are no hidden fees, subscriptions, or signups required.") ]),
    h3([ text("Is my data secure?") ]),
    p([ text("Absolutely. All formatting is done locally in your browser. Your JSON data never leaves your device, ensuring complete privacy and security.") ]),
    h3([ text("Can I format large JSON files?") ]),
    p([ text("Yes, our tool can handle large JSON files. However, the performance may depend on your device's capabilities.") ]),

    h2([ text("Support Us") ]),
    p([ text("If you find our JSON Formatter helpful, consider supporting us on Patreon. Your support helps us keep the tool free and allows us to develop more useful web applications.") ]),

    h2([ text("Try Our Other Free Tools") ]),
    p([ text("Free App Kit offers a variety of free web applications to simplify your tasks. From randomizing lines of text to analyzing word counts, we have tools designed to make your life easier. Check them out and see how they can help you!") ])
  ])
};

export const removeAccentsFromTextCommand: ICommand = {
  name: "Remove Accents From Text",
  description: "Replace accented characters with their non-accented equivalents",
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => removeAccents(args['text']),
};

export const trimLeadingTrailingSpaceCommand: ICommand = {
  name: "Trim Line Space",
  description: "Trim spaces from the beginning and end of each line",
  parameters: [
    {
      name: "text",
      type: { kind: 'text' },
      description: "Paste your text below"
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => lines(args['text']).map((line: string) => line.trim()).join('\n'),
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
  jsonFormatterCommand,
  removeAccentsFromTextCommand,
  trimLeadingTrailingSpaceCommand
];