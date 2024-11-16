export async function waitMs(delayMs: number) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}
