import { removeDuplicateLines, removeEmptyLines } from "./util";

export const strings = {
  freeAppKit: {
    en: "Free App Kit",
    es: "Kit de Aplicación Gratuita",
  },
  freeWebApplications: {
    en: "Free Web Applications",
    es: "Aplicaciones Web Gratuitas",
  },
  supportUsOnPatreon: {
    en: "Support us on Patreon!",
    es: "¡Apóyanos en Patreon!",
  },

  ourApps: {
    en: "Our apps:",
    es: "Nuestras aplicaciones:",
  },

  pageNotFound: {
    en: "Page not found!",
    es: "¡Página no encontrada!",
  },

  fileNoun: {
    en: "File",
    es: "Archivo",
  },
  new: {
    en: "New",
    es: "Nuevo",
  },
  open: {
    en: "Open",
    es: "Abrir",
  },
  saveAs: {
    en: "Save As",
    es: "Guardar como",
  },

  tools: {
    en: "Tools",
    es: "Herramientas",
  },

  copyToClipboard: {
    en: "Copy to Clipboard",
    es: "Copiar al Portapapeles"
  },

  randomizeLines: {
    en: "Randomize Lines",
    es: "Aleatorizar Líneas",
  },
  randomizeLinesPath: {
    en: "/randomize-lines",
    es: "/aleatorizar-líneas",
  },
  randomizeLinesDescription: {
    en: "Randomize/shuffle lines of text with this free online tool. Simply paste your text/list into the 1st box below and click the \"Randomize\" button, then copy the randomized lines from the 2nd box below.",
    es: "Aleatorice/baraje las líneas de texto con esta herramienta en línea gratuita. Simplemente pegue su texto/lista en la 1ª casilla a continuación y haga clic en el botón \"Aleatorizar\", luego copie las líneas aleatorizadas de la 2ª casilla a continuación."
  },

  removeEmptyLines: {
    en: "Remove Empty Lines",
    es: "Eliminar Líneas Vacías",
  },
  removeEmptyLinesPath: {
    en: "/remove-empty-lines",
    es: "/eliminar-líneas-vacías",
  },
  removeEmptyLinesDescription: {
    en: "Remove empty/blank lines of text with this free online tool. Simply paste your text/list into the 1st box below and click the \"Remove empty lines\" button.",
    es: "Elimine líneas vacías en blanco de texto con esta herramienta en línea gratuita. Simplemente pegue su texto/lista en la 1ª casilla a continuación y haga clic en el botón \"Eliminar líneas vacías\"."
  },

  sortLines: {
    en: "Sort Lines",
    es: "Ordenar Líneas",
  },
  sortLinesPath: {
    en: "/sort-lines",
    es: "/ordenar-líneas",
  },
  sortLinesDescription: {
    en: "Sort lines of text with this free online tool. Simply paste your text/list into the 1st box below, configure the tool using the checkboxes, click the \"Sort\" button.",
    es: "Ordene líneas de texto con esta herramienta en línea gratuita. Simplemente pegue su texto/lista en la 1ª casilla a continuación, configure la herramienta usando las casillas de verificación, haga clic en el botón \"Ordenar\"."
  },
  sortInDescendingOrder: {
    en: "Sort in descending order",
    es: "Ordenar en orden descendente",
  },
  sortCaseSensitively: {
    en: "Sort case-sensitively",
    es: "Ordenar con distinción entre mayúsculas y minúsculas",
  },

  convertToLowerCase: {
    en: "Convert to Lowercase",
    es: "Convertir a Minúsculas",
  },
  convertToLowerCasePath: {
    en: "/convert-to-lowercase",
    es: "/convertir-a-minúsculas",
  },
  convertToLowerCaseDescription: {
    en: "Convert text to lowercase with this free online lowercase converter. Simply paste your text into the 1st box below and click the \"Convert to lowercase\" button.",
    es: "Convierte texto a minúsculas con este convertidor de minúsculas en línea gratuito. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Convertir a minúsculas\"."
  },

  convertToUpperCase: {
    en: "Convert to Uppercase",
    es: "Convertir a Mayúsculas",
  },
  convertToUpperCasePath: {
    en: "/convert-to-uppercase",
    es: "/convertir-a-mayúsculas",
  },
  convertToUpperCaseDescription: {
    en: "Convert text to uppercase with this free online uppercase converter. Simply paste your text into the 1st box below and click the \"Convert to uppercase\" button.",
    es: "Convierte texto a mayúsculas con este convertidor de mayúsculas en línea gratuito. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Convertir a mayúsculas\"."
  },

  base64Encode: {
    en: "Base64 Encode",
    es: "Codificar Base64",
  },
  base64EncodePath: {
    en: "/base64-encode",
    es: "/codificar-base64",
  },
  base64EncodeDescription: {
    en: "Base64 encode text with this free online tool. Simply paste your text into the 1st box below and click the \"Base64 Encode\" button.",
    es: "Codifique en Base64 el texto con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Codificar Base64\"."
  },

  base64Decode: {
    en: "Base64 Decode",
    es: "Decodificar Base64",
  },
  base64DecodePath: {
    en: "/base64-decode",
    es: "/decodificar-base64",
  },
  base64DecodeDescription: {
    en: "Base64 decode text with this free online tool. Simply paste your text into the 1st box below and click the \"Base64 Decode\" button.",
    es: "Decodifique en Base64 el texto con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Decodificar Base64\"."
  },

  urlEncode: {
    en: "URL Encode",
    es: "Codificar URL",
  },
  urlEncodePath: {
    en: "/url-encode",
    es: "/codificar-url",
  },
  urlEncodeDescription: {
    en: "URL encode text with this free online tool. Simply paste your text into the 1st box below and click the \"URL Encode\" button.",
    es: "Codifique en URL el texto con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Codificar URL\"."
  },

  urlDecode: {
    en: "URL Decode",
    es: "Decodificar URL",
  },
  urlDecodePath: {
    en: "/url-decode",
    es: "/decodificar-url",
  },
  urlDecodeDescription: {
    en: "URL decode text with this free online tool. Simply paste your text into the 1st box below and click the \"URL Decode\" button.",
    es: "Decodifique en URL el texto con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Decodificar URL\"."
  },

  addToEndOfEachLine: {
    en: "Add to End of Each Line",
    es: "Agregar al Final de Cada Línea",
  },
  addToEndOfEachLinePath: {
    en: "/add-to-end-of-each-line",
    es: "/agregar-al-final-de-cada-línea",
  },
  addToEndOfEachLineDescription: {
    en: "Add text to the end of each line with this free online tool. Simply paste your text into the 1st box below, type the text you want to add into the 2nd box below, click the \"Add to End of Each Line\" button, then copy the output from the 3rd box below.",
    es: "Agregue texto al final de cada línea con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación, escriba el texto que desea agregar en la 2ª casilla a continuación, haga clic en el botón \"Agregar al Final de Cada Línea\", luego copie la salida de la 3ª casilla a continuación."
  },
  textToAdd: {
    en: "Text to add",
    es: "Texto para agregar",
  },

  removeDuplicateLines: {
    en: "Remove Duplicate Lines",
    es: "Eliminar Líneas Duplicadas",
  },
  removeDuplicateLinesPath: {
    en: "/remove-duplicate-lines",
    es: "/eliminar-líneas-duplicadas",
  },
  removeDuplicateLinesDescription: {
    en: "Delete duplicate lines with this free online tool. Simply paste your text/list into the 1st box below and click the \"Remove Duplicate Lines\" button, then copy the de-duplicated lines from the 2nd box. The duplicate lines that were detected are also displayed in the 3rd box below.",
    es: "Elimine líneas duplicadas con esta herramienta en línea gratuita. Simplemente pegue su texto/lista en la 1ª casilla a continuación y haga clic en el botón \"Eliminar Líneas Duplicadas\", luego copie las líneas sin duplicados de la 2ª casilla. Las líneas duplicadas detectadas también se muestran en la 3ª casilla a continuación."
  },
  alsoRemoveLinesOfBlankCharacters: {
    en: "Also remove lines of blank characters",
    es: "También elimine líneas de caracteres en blanco",
  },
  deDuplicatedText: {
    en: "De-duplicated text",
    es: "Texto sin duplicados",
  },
  duplicateLinesThatWereRemoved: {
    en: "Duplicate lines that were removed",
    es: "Líneas duplicadas que se eliminaron",
  },

  plainTextEditor: {
    en: "Plain-Text Editor",
    es: "Editor de Texto Plano"
  },

  countCharacters: {
    en: "Count Characters",
    es: "Contar Caracteres",
  },
  countCharactersPath: {
    en: "/count-characters",
    es: "/contar-caracteres",
  },
  countCharactersDescription: {
    en: "Count characters with this free online tool. Simply paste your text into the 1st box below and click the \"Count Characters\" button.",
    es: "Cuenta caracteres con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Contar Caracteres\"."
  },

  countWords: {
    en: "Count Words",
    es: "Contar Palabras",
  },
  countWordsPath: {
    en: "/count-words",
    es: "/contar-palabras",
  },
  countWordsDescription: {
    en: "Count words with this free online tool. Simply paste your text into the 1st box below and click the \"Count Words\" button.",
    es: "Cuenta palabras con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Contar Palabras\"."
  },

  countLines: {
    en: "Count Lines",
    es: "Contar Líneas",
  },
  countLinesPath: {
    en: "/count-lines",
    es: "/contar-líneas",
  },
  countLinesDescription: {
    en: "Count lines with this free online tool. Simply paste your text into the 1st box below and click the \"Count Lines\" button.",
    es: "Cuenta líneas con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Contar Líneas\"."
  },

  countSentencesCommand: {
    en: "Count Sentences",
    es: "Contar Sentencias",
  },
  countSentencesPath: {
    en: "/count-sentences",
    es: "/contar-sentencias",
  },
  countSentencesDescription: {
    en: "Count sentences with this free online tool. Simply paste your text into the 1st box below and click the \"Count Sentences\" button.",
    es: "Cuenta oraciones con esta herramienta en línea gratuita. Simplemente pegue su texto en la 1ª casilla a continuación y haga clic en el botón \"Contar Oraciones\"."
  },

  keytuneLink: {
    en: "KeyTune - Learn to play songs on piano for free!",
    es: "KeyTune - ¡Aprende a tocar canciones en el piano gratis!",
  },

  plainTextEditorPath: {
    en: "/plain-text-editor",
    es: "/editor-de-texto-plano",
  },
  plainTextEditorDescription: {
    en: "Edit plain-text with our advanced web tool. Enter your text below and select a tool to apply.",
    es: "Edite texto plano con nuestra avanzada herramienta web. Ingrese su texto a continuación y seleccione una herramienta para aplicar."
  },

  supportedLanguages: {
    en: "Supported languages:",
    es: "Idiomas soportados:",
  },

  pasteYourTextBelow: {
    en: "Paste your text below",
    es: "Pegue su texto a continuación",
  },

  reset: {
    en: "Reset",
    es: "Restablecer",
  },

  output: {
    en: "Output",
    es: "Salida",
  },

  clearVerb: {
    en: "Clear",
    es: "Limpiar",
  },

  loadFromFile: {
    en: "Load from file",
    es: "Cargar desde archivo",
  },

  saveToFile: {
    en: "Save to file",
    es: "Guardar en archivo",
  },
};