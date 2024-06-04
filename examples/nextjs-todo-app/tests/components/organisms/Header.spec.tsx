import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import assert from "assert";
import { Header } from "../../../components/organisms/Header";

describe("Header Component", () => {
  describe("Organisms", () => {
    beforeEach(cleanup);
    it("should render", async () => {
      //arrange
      render(<Header title="Bla">foo</Header>);

      //act
      const actual = await screen.findByTestId("header-title");

      //assert
      assert.equal(actual.innerHTML, "Bla");
    });
  });
});
