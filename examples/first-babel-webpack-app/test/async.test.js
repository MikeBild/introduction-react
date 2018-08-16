import assert from "assert";
import fetch from "node-fetch";

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

function loadFromServer(resource) {
  // try {
  //   const response = await fetch(`http://localhost:6666/${resource}`);
  //   const result = await response.json();
  //   return result;
  // } catch (error) {
  //   throw new Error("Fehler");
  // }
  return fetch(`http://localhost:6666/${resource}`)
    .then(response => response.json())
    .catch(error => Promise.reject(new Error("Fehler")));
}

describe("Async tests with mocha", () => {
  it("A simple timeout wrapped promise test, should retrun ... ", () => {
    return loadSomething().then(data => {
      assert.equal(data.demo, "foo");
    });
  });

  it("A simple fetch should return data", () => {
    return loadFromServer("articles")
      .then(articles =>
        loadFromServer("items").then(items => [...articles, ...items])
      )
      .then(data => {
        assert.deepEqual(data, [{ id: 1 }, { id: 2 }]);
      });
  });

  // it("A simple fetch should return data", async () => {
  //   const articles = await loadFromServer("articles");
  //   const items = await loadFromServer("items");
  //   const data = [...articles, ...items];
  //   assert.deepEqual(data, [{ id: 1 }, { id: 2 }]);
  // });

  it("map", () => {
    const l1 = [1, 2, 3, 4];

    const actual = l1.map(x => {
      return x + x;
    });

    assert.deepEqual(actual, [2, 4, 6, 8]);
  });

  it("filter", () => {
    const l1 = [1, 2, 3, 4];

    const actual = l1.filter(x => {
      return x % 2;
    });

    assert.deepEqual(actual, [1, 3]);
  });

  it("reduce", () => {
    const l1 = [1, 2, 3, 4];

    const actual = l1.reduce((state, x) => {
      state = state + x;
      return state;
    }, 0);

    assert.deepEqual(actual, 10);
  });

  it("reduce 2", () => {
    const l1 = [{ id: 1 }, { id: 2 }];

    const actual = l1.reduce((state, x) => {
      state[x.id] = x;
      return state;
    }, {});

    assert.deepEqual(actual, { "1": { id: 1 }, "2": { id: 2 } });
  });

  it.only("reduce reducer", () => {
    const store = { articles: 0 };
    const l1 = [
      { type: "ADD_ARTICLE" },
      { type: "REMOVE_ARTICLE" },
      { type: "ADD_ARTICLE" }
    ];

    const state = l1.reduce((state, x) => {
      if (x.type === "ADD_ARTICLE") state.articles = state.articles + 1;
      if (x.type === "REMOVE_ARTICLE") state.articles = state.articles - 1;
      return state;
    }, store);

    assert.deepEqual(state, { articles: 1 });
  });
});
