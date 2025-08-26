import React from "react";
import assert from "assert";
import { render, screen, cleanup } from "@testing-library/react";
import { TodoList } from "../../../components/organisms/TodoList";

describe("Organisms", () => {
  describe("TodoList Component", () => {
    beforeEach(cleanup);
    it("should render TodoList items", async () => {
      //arrange
      render(
        <TodoList items={[{ id: "1", desc: "test 1", state: "closed" }]} />
      );

      //act
      const actual = await screen.findByTestId("TodoList-ul");

      //assert
      assert.equal(actual.children.length, 1);
    });
  });
});
