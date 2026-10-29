export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timeoutRef = setTimeout(() => {
      clearTimeout(timeoutRef);
      resolve();
    }, ms);
  });
}
