import React from "react";
import assert from "assert";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { TodoItem } from "../../../components/moleculs/TodoItem";

describe("Moleculs", () => {
  describe("TodoItem Component", () => {
    beforeEach(cleanup);

    it("should render a TodoItem", async () => {
      //arrange
      render(
        <TodoItem item={{ desc: "test-desc", id: "test-id", state: "open" }} />
      );
      const actualInputCheckbox: HTMLInputElement = await screen.findByTestId(
        "TodoItem-input-checkbox"
      );
      const actualInputText: HTMLInputElement = await screen.findByTestId(
        "TodoItem-input-text"
      );

      //assert
      assert.equal(actualInputCheckbox.checked, true);
      assert.equal(actualInputText.value, "test-desc");
    });
  });
});
