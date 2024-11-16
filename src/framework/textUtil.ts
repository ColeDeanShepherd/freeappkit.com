import './arrayUtil';

export function lines(text: string) {
  return text.split('\n');
}

export function detectAndRemoveDuplicateLines(text: string) {
  const linesArr = lines(text);

  const uniqueLines = new Set<string>();
  const duplicateLines: string[] = [];

  for (const line of linesArr) {
    if (uniqueLines.has(line)) {
      duplicateLines.push(line);
    } else {
      uniqueLines.add(line);
    }
  }

  return {
    uniqueLines: Array.from(uniqueLines).join('\n'),
    duplicateLines: duplicateLines.join('\n')
  };
}

export function removeDuplicateLines(text: string) {
  return Array.from(new Set(lines(text))).join('\n');
}

export function sortLines(text: string, descending: boolean, caseSensitive: boolean, deleteEmptyLines: boolean, trimLinesBeforeSorting: boolean) {
  let _lines = lines(text);

  if (deleteEmptyLines) {
    _lines = _lines.filter(line => line.trim() !== '');
  }

  if (trimLinesBeforeSorting) {
    _lines = _lines.map(line => line.trim());
  }

  const sortedLines = _lines.sort((a, b) => {
    if (!caseSensitive) {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  
  if (descending) {
    sortedLines.reverse();
  }

  return sortedLines.join('\n');
}

export function removeEmptyLines(text: string, alsoRemoveLinesOfBlankChars: boolean) {
  return lines(text)
    .filter(line => {
      if (alsoRemoveLinesOfBlankChars) {
        return line.trim() !== '';
      } else {
        return line !== '';
      }
    })
    .join('\n');
}

export function shuffleLines(text: string) {
  return lines(text).shuffle().join('\n');
}

export function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}