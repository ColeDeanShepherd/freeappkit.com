import { shuffleLines } from './util';
import { ICommand, mkRouteFromCommand } from './command';

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

export const randomizeLinesRoute = mkRouteFromCommand(randomizeLinesCommand);
