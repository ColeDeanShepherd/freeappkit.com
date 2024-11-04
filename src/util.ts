export async function waitMs(delayMs: number) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}

export function removeDuplicateLines(text: string) {
  return Array.from(new Set(text.split('\n'))).join('\n');
}