import { get } from "http";

export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function getFreeAppKitApexHost() {
  return isDevEnv()
    ? `localhost:${window.location.port}` : 'freeappkit.com';
}

export async function waitMs(delayMs: number) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}

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

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function shuffleLines(text: string) {
  return shuffleArray(lines(text)).join('\n');
}

export function saveStringToFile(content: string, filename = 'download.txt', mimeType = 'text/plain') {
  // Create a Blob containing the string data
  const blob = new Blob([content], { type: mimeType });
  
  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append link to body (required for Firefox)
  document.body.appendChild(link);
  
  // Programmatically click the link to trigger the download
  link.click();
  
  // Clean up by removing the link and revoking the URL
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function openFilePicker(): Promise<File | null> {
  return new Promise((resolve) => {
    // Create an invisible file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';

    // Add an event listener to handle file selection
    input.addEventListener('change', () => {
      const file = input.files ? input.files[0] : null;
      resolve(file);
    });

    // Trigger click to open the file picker
    document.body.appendChild(input);
    input.click();

    // Remove the input element after selection
    input.addEventListener('click', () => {
      setTimeout(() => {
        document.body.removeChild(input);
      }, 1000);
    });
  });
}

export function except<T>(array: T[], valuesToExclude: T[]): T[] {
  return array.filter(item => !valuesToExclude.includes(item));
}

export function getSubdomain(): string | undefined {
  let subdomain = window.location.hostname.replace(`${getFreeAppKitApexHost()}`, '');
  subdomain = subdomain.replace(/\.$/, '');
  return (subdomain.length >= 1) ? subdomain : undefined;
}

export function getUrlWithNewSubdomain(url: URL, newSubdomain: string | undefined) {
  const hostnameParts = url.hostname.split('.');

  if (hostnameParts.length > 1) {
    if (newSubdomain === undefined) {
      hostnameParts.shift();
    } else {
      hostnameParts[0] = newSubdomain;
    }
  } else if (newSubdomain !== undefined) {
    hostnameParts.unshift(newSubdomain);
  }

  const newUrl = new URL(url.href);
  newUrl.hostname = hostnameParts.join('.');
  return newUrl;
}

export function changeSubdomain(newSubdomain: string | undefined) {
  const newUrl = getUrlWithNewSubdomain(new URL(window.location.href), newSubdomain);
  window.location.href = newUrl.href;
}

export function arrayLast<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}