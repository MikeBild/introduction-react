describe('Integration tests for dashboard', () => {
  it('response should have status code 200', () => {
    return page.goto('http://localhost:1234')
      .then(response => {
        expect(response.status()).toBe(200)
      })
  })
})