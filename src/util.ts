export async function waitMs(delayMs: number) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}

export function lines(text: string) {
  return text.split('\n');
}

export function removeDuplicateLines(text: string) {
  return Array.from(new Set(lines(text))).join('\n');
}

export function sortLines(text: string) {
  return lines(text).sort().join('\n');
}