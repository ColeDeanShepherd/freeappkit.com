import { shuffleLines, removeEmptyLines, sortLines, removeAccents, lines } from './framework/textUtil';
import { ICommand, IType } from './command';
import { strings } from './strings';
import { v4 as uuidv4 } from 'uuid';
import { div, h2, h3, li, ol, p, text, ul } from './framework/ui/ui-core';
import Decimal from 'decimal.js';

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

export const generateGuidsCommand: ICommand = {
  name: "Generate GUIDs",
  description: "Generate GUIDs",
  parameters: [
    {
      name: "numGuids",
      type: { kind: 'number' },
      description: "Number of GUIDs to generate",
      defaultValue: 5
    }
  ],
  returnType: { kind: 'text' },
  runFn: (args) => {
    const numGuids = args['numGuids'];
    const guids = Array.from({ length: numGuids }, () => uuidv4());
    return guids.join('\n');
  },
};

// #region Unit Conversion

interface IUnit {
  name: string;
  abbreviation: string;
  numBaseUnits: Decimal;
}

interface IUnitKind {
  name: string;
  units: IUnit[];
  baseUnitName: string;
}

const unitKinds: IUnitKind[] = [
  {
    name: "Length",
    baseUnitName: "Meters",
    units: [
      { name: "Meters", abbreviation: "m", numBaseUnits: new Decimal('1') },
      { name: "Kilometers", abbreviation: "km", numBaseUnits: new Decimal('1000') },
      { name: "Centimeters", abbreviation: "cm", numBaseUnits: new Decimal('0.01') },
      { name: "Millimeters", abbreviation: "mm", numBaseUnits: new Decimal('0.001') },
      { name: "Miles", abbreviation: "mi", numBaseUnits: new Decimal('1609.344') },
      { name: "Yards", abbreviation: "yd", numBaseUnits: new Decimal('0.9144') },
      { name: "Feet", abbreviation: "ft", numBaseUnits: new Decimal('0.3048') },
      { name: "Inches", abbreviation: "in", numBaseUnits: new Decimal('0.0254') }
    ]
  },
  {
    name: "Mass",
    baseUnitName: "Kilograms",
    units: [
      { name: "Kilograms", abbreviation: "kg", numBaseUnits: new Decimal('1') },
      { name: "Grams", abbreviation: "g", numBaseUnits: new Decimal('0.001') },
      { name: "Milligrams", abbreviation: "mg", numBaseUnits: new Decimal('0.000001') },
      { name: "Pounds", abbreviation: "lb", numBaseUnits: new Decimal('0.45359237') },
      { name: "Ounces", abbreviation: "oz", numBaseUnits: new Decimal('0.028349523125') }
    ]
  },
  {
    name: "Volume",
    baseUnitName: "Liters",
    units: [
      { name: "Liters", abbreviation: "L", numBaseUnits: new Decimal('1') },
      { name: "Milliliters", abbreviation: "mL", numBaseUnits: new Decimal('0.001') },
      { name: "Cubic Meters", abbreviation: "m³", numBaseUnits: new Decimal('1000') },
      { name: "Cubic Centimeters", abbreviation: "cm³", numBaseUnits: new Decimal('0.001') },
      { name: "Gallons", abbreviation: "gal", numBaseUnits: new Decimal('3.78541') },
      { name: "Quarts", abbreviation: "qt", numBaseUnits: new Decimal('0.946353') },
      { name: "Pints", abbreviation: "pt", numBaseUnits: new Decimal('0.473176') },
      { name: "Cups", abbreviation: "cup", numBaseUnits: new Decimal('0.236588') },
      { name: "Fluid Ounces", abbreviation: "fl oz", numBaseUnits: new Decimal('0.0295735') }
    ]
  },
  {
    name: "Temperature",
    baseUnitName: "Celsius",
    units: [
      { name: "Celsius", abbreviation: "°C", numBaseUnits: new Decimal('1') },
      { name: "Fahrenheit", abbreviation: "°F", numBaseUnits: new Decimal('1').times(5).div(9).plus(32) },
      { name: "Kelvin", abbreviation: "K", numBaseUnits: new Decimal('1').plus(273.15) }
    ]
  },
  {
    name: "Time",
    baseUnitName: "Seconds",
    units: [
      { name: "Seconds", abbreviation: "s", numBaseUnits: new Decimal('1') },
      { name: "Minutes", abbreviation: "min", numBaseUnits: new Decimal('60') },
      { name: "Hours", abbreviation: "hr", numBaseUnits: new Decimal('3600') },
      { name: "Days", abbreviation: "days", numBaseUnits: new Decimal('86400') },
      { name: "Weeks", abbreviation: "weeks", numBaseUnits: new Decimal('604800') },
      { name: "Years", abbreviation: "years", numBaseUnits: new Decimal('31536000') }
    ]
  },
  {
    name: "Area",
    baseUnitName: "Square Meters",
    units: [
      { name: "Square Meters", abbreviation: "m²", numBaseUnits: new Decimal('1') },
      { name: "Square Kilometers", abbreviation: "km²", numBaseUnits: new Decimal('1000000') },
      { name: "Square Centimeters", abbreviation: "cm²", numBaseUnits: new Decimal('0.0001') },
      { name: "Square Millimeters", abbreviation: "mm²", numBaseUnits: new Decimal('0.000001') },
      { name: "Hectares", abbreviation: "ha", numBaseUnits: new Decimal('10000') },
      { name: "Acres", abbreviation: "ac", numBaseUnits: new Decimal('4046.86') }
    ]
  },
  {
    name: "Speed",
    baseUnitName: "Meters per Second",
    units: [
      { name: "Meters per Second", abbreviation: "m/s", numBaseUnits: new Decimal('1') },
      { name: "Kilometers per Hour", abbreviation: "km/h", numBaseUnits: new Decimal('1').times(3600).div(1000) },
      { name: "Miles per Hour", abbreviation: "mph", numBaseUnits: new Decimal('1').times(3600).div(1609.344) },
      { name: "Knots", abbreviation: "kn", numBaseUnits: new Decimal('1').times(1852).div(3600) },
      { name: "Feet per Second", abbreviation: "ft/s", numBaseUnits: new Decimal('0.3048') },
    ]
  },
  {
    name: "Pressure",
    baseUnitName: "Pascals",
    units: [
      { name: "Pascals", abbreviation: "Pa", numBaseUnits: new Decimal('1') },
      { name: "Kilopascals", abbreviation: "kPa", numBaseUnits: new Decimal('1000') },
      { name: "Megapascals", abbreviation: "MPa", numBaseUnits: new Decimal('1000000') },
      { name: "Bars", abbreviation: "bar", numBaseUnits: new Decimal('100000') },
      { name: "Millibars", abbreviation: "mbar", numBaseUnits: new Decimal('100') },
      { name: "Pounds per Square Inch", abbreviation: "psi", numBaseUnits: new Decimal('6894.76') },
      { name: "Atmospheres", abbreviation: "atm", numBaseUnits: new Decimal('101325') },
      { name: "Millimeters of Mercury", abbreviation: "mmHg", numBaseUnits: new Decimal('133.322') },
      { name: "Inches of Mercury", abbreviation: "inHg", numBaseUnits: new Decimal('3386.39') }
    ]
  },
  {
    name: "Energy",
    baseUnitName: "Joules",
    units: [
      { name: "Joules", abbreviation: "J", numBaseUnits: new Decimal('1') },
      { name: "Kilojoules", abbreviation: "kJ", numBaseUnits: new Decimal('1000') },
      { name: "Calories", abbreviation: "cal", numBaseUnits: new Decimal('4.184') },
      { name: "Kilocalories", abbreviation: "kcal", numBaseUnits: new Decimal('4184') },
      { name: "Watt-Hours", abbreviation: "Wh", numBaseUnits: new Decimal('3600') },
      { name: "Kilowatt-Hours", abbreviation: "kWh", numBaseUnits: new Decimal('3600000') },
      { name: "Electronvolts", abbreviation: "eV", numBaseUnits: new Decimal('1.60218e-19') }
    ]
  },
  {
    name: "Power",
    baseUnitName: "Watts",
    units: [
      { name: "Watts", abbreviation: "W", numBaseUnits: new Decimal('1') },
      { name: "Kilowatts", abbreviation: "kW", numBaseUnits: new Decimal('1000') },
      { name: "Megawatts", abbreviation: "MW", numBaseUnits: new Decimal('1000000') },
      { name: "Gigawatts", abbreviation: "GW", numBaseUnits: new Decimal('1000000000') },
      { name: "Horsepower", abbreviation: "hp", numBaseUnits: new Decimal('745.7') }
    ]
  },
  {
    name: "Force",
    baseUnitName: "Newtons",
    units: [
      { name: "Newtons", abbreviation: "N", numBaseUnits: new Decimal('1') },
      { name: "Kilonewtons", abbreviation: "kN", numBaseUnits: new Decimal('1000') },
      { name: "Pounds of Force", abbreviation: "lbf", numBaseUnits: new Decimal('4.44822') }
    ]
  },
  {
    name: "Data",
    baseUnitName: "Bytes",
    units: [
      { name: "Bytes", abbreviation: "B", numBaseUnits: new Decimal('1') },
      { name: "Kilobytes", abbreviation: "KB", numBaseUnits: new Decimal('1024') },
      { name: "Megabytes", abbreviation: "MB", numBaseUnits: new Decimal('1048576') },
      { name: "Gigabytes", abbreviation: "GB", numBaseUnits: new Decimal('1073741824') },
      { name: "Terabytes", abbreviation: "TB", numBaseUnits: new Decimal('1099511627776') },
      { name: "Petabytes", abbreviation: "PB", numBaseUnits: new Decimal('1125899906842624') },
      { name: "Exabytes", abbreviation: "EB", numBaseUnits: new Decimal('1152921504606846976') },
      { name: "Zettabytes", abbreviation: "ZB", numBaseUnits: new Decimal('1180591620717411303424') },
      { name: "Yottabytes", abbreviation: "YB", numBaseUnits: new Decimal('1208925819614629174706176') },
    ]
  },
  {
    name: "Frequency",
    baseUnitName: "Hertz",
    units: [
      { name: "Hertz", abbreviation: "Hz", numBaseUnits: new Decimal('1') },
      { name: "Kilohertz", abbreviation: "kHz", numBaseUnits: new Decimal('1000') },
      { name: "Megahertz", abbreviation: "MHz", numBaseUnits: new Decimal('1000000') },
      { name: "Gigahertz", abbreviation: "GHz", numBaseUnits: new Decimal('1000000000') }
    ]
  },
  {
    name: "Angle",
    baseUnitName: "Degrees",
    units: [
      { name: "Degrees", abbreviation: "°", numBaseUnits: new Decimal('1') },
      { name: "Radians", abbreviation: "rad", numBaseUnits: new Decimal('180').div(Math.PI) },
      { name: "Gradians", abbreviation: "grad", numBaseUnits: new Decimal('0.9') },
      { name: "Minutes", abbreviation: "'", numBaseUnits: new Decimal('1').div(60) },
      { name: "Seconds", abbreviation: "\"", numBaseUnits: new Decimal('1').div(3600) }
    ]
  },
  {
    name: "Data Rate",
    baseUnitName: "Bits per Second",
    units: [
      { name: "Bits per Second", abbreviation: "bps", numBaseUnits: new Decimal('1') },
      { name: "Kilobits per Second", abbreviation: "kbps", numBaseUnits: new Decimal('1000') },
      { name: "Megabits per Second", abbreviation: "Mbps", numBaseUnits: new Decimal('1000000') },
      { name: "Gigabits per Second", abbreviation: "Gbps", numBaseUnits: new Decimal('1000000000') },
      { name: "Terabits per Second", abbreviation: "Tbps", numBaseUnits: new Decimal('1000000000000') },
      { name: "Petabits per Second", abbreviation: "Pbps", numBaseUnits: new Decimal('1000000000000000') },
      { name: "Exabits per Second", abbreviation: "Ebps", numBaseUnits: new Decimal('1000000000000000000') },
      { name: "Zettabits per Second", abbreviation: "Zbps", numBaseUnits: new Decimal('1000000000000000000000') },
      { name: "Yottabits per Second", abbreviation: "Ybps", numBaseUnits: new Decimal('1000000000000000000000000') }
    ]
  },
  {
    name: "Density",
    baseUnitName: "Kilograms per Cubic Meter",
    units: [
      { name: "Kilograms per Cubic Meter", abbreviation: "kg/m³", numBaseUnits: new Decimal('1') },
      { name: "Grams per Cubic Centimeter", abbreviation: "g/cm³", numBaseUnits: new Decimal('1000') },
      { name: "Pounds per Cubic Foot", abbreviation: "lb/ft³", numBaseUnits: new Decimal('16.0184634') }
    ]
  },
  {
    name: "Electric Current",
    baseUnitName: "Amperes",
    units: [
      { name: "Amperes", abbreviation: "A", numBaseUnits: new Decimal('1') },
      { name: "Milliamperes", abbreviation: "mA", numBaseUnits: new Decimal('0.001') }
    ]
  }
];

function convertUnit(value: Decimal, fromUnit: IUnit, toUnit: IUnit) {
  return value.times(fromUnit.numBaseUnits).div(toUnit.numBaseUnits);
}

const unitConversionCommands: ICommand[] =
  unitKinds.flatMap(unitKind =>
    unitKind.units.flatMap(fromUnit =>
      unitKind.units.except([fromUnit]).map(toUnit => {
        const fromUnitInToUnits = convertUnit(new Decimal(1), fromUnit, toUnit);
        const toUnitInFromUnits = convertUnit(new Decimal(1), toUnit, fromUnit);

        const command: ICommand = {
          name: `Convert ${fromUnit.name} to ${toUnit.name} (${unitKind.name})`,
          description: `Convert ${fromUnit.name} to ${toUnit.name} (${unitKind.name}). 1 ${fromUnit.abbreviation} = ${fromUnitInToUnits.toNumber()} ${toUnit.abbreviation}. 1 ${toUnit.abbreviation} = ${toUnitInFromUnits.toNumber()} ${fromUnit.abbreviation}.`,
          parameters: [
            {
              name: "value",
              type: { kind: 'number' },
              description: "Value to convert"
            }
          ],
          returnType: { kind: 'number' },
          runFn: (args) => convertUnit(new Decimal(args['value']), fromUnit, toUnit).toNumber()
        };
        return command;
      })
    )
  );

// #endregion Unit Conversion

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
  trimLeadingTrailingSpaceCommand,
  generateGuidsCommand
]
  .concat(unitConversionCommands);