describe('End to End - Demo App', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:1234');
  });

  it('should be titled "Demo"', async () => {
    await expect(page.title()).resolves.toBe('Demo App');
  });
});
