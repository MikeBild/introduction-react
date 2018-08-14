import assert from "assert";
import fetch from "node-fetch";

function add(x, y) {
  return x + y;
}

function demo(done) {
  setTimeout(() => {
    done("foo");
  }, 1000);
  // fetch("sksjs").then(data => done("foo"));
}

describe("Some unit tests", () => {
  describe("more...", () => {
    it("A simple test should return true", () => {
      //arrange
      //act
      const actual = add(1, 1);
      assert.equal(actual, 2);
    });

    it("A simple test should return true 2", done => {
      //arrange
      //act
      demo(actual => {
        assert.equal(actual, "foo");
        done();
      });
    });
  });
});
