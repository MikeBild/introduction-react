import assert from "assert";

function loadSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          demo: "foo"
        }),
      1000
    );
    // reject(new Error("fehler"));
    // throw new Error("fehler");
  });
}

describe("Async tests with mocha", () => {
  it("A simple promise test, should retrun ... ", () => {
    return loadSomething().then(data => {
      assert.equal(data.demo, "foo");
    });
  });
});
