import React from "react";
import assert from "assert";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { TodoAdd } from "../../../components/moleculs/TodoAdd";

describe("Moleculs", () => {
  describe("TodoAdd Component", () => {
    beforeEach(cleanup);

    it("should raise onTodoAdd on user input and button click", async () => {
      let actual = null;
      //arrange
      render(
        <TodoAdd
          onTodoAdd={(desc) => {
            actual = desc;
          }}
        />
      );

      //act
      fireEvent.change(await screen.findByTestId("TodoAdd-input"), {
        target: { value: "test input" },
      });
      fireEvent.click(await screen.findByTestId("TodoAdd-button"));

      //assert
      assert.equal(actual, "test input");
    });
  });
});
