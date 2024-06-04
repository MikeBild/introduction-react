import React from "react";
import assert from "assert";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MenuItem } from "../../../components/moleculs/MenuItem";

describe("Moleculs", () => {
  describe("MenuItem Component", () => {
    beforeEach(cleanup);

    it("should render a MenuItem", async () => {
      //arrange
      render(<MenuItem item={{ text: "test-text", url: "test-url" }} />);
      const actual = await screen.findByTestId("MenuItem-Link");
      //act

      //assert
      assert.equal(actual.innerHTML, "test-text");
      assert.equal(actual.getAttribute("href"), "test-url");
    });
  });
});
