export async function waitMs(delayMs: number) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}

export function lines(text: string) {
  return text.split('\n');
}

export function removeDuplicateLines(text: string) {
  return Array.from(new Set(lines(text))).join('\n');
}

export function sortLines(text: string, descending: boolean, caseSensitive: boolean) {
  const sortedLines = lines(text).sort((a, b) => {
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