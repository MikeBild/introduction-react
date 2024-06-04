import React from "react";
import assert from "assert";
import { render, screen, cleanup } from "@testing-library/react";
import { Header } from "../../../components/organisms/Header";

describe("Header Component", () => {
  describe("Organisms", () => {
    beforeEach(cleanup);
    it("should render title", async () => {
      //arrange
      render(<Header title="Bla">foo</Header>);

      //act
      const actual = await screen.findByTestId("header-title");

      //assert
      assert.equal(actual.innerHTML, "Bla");
    });

    it("should render children", async () => {
      //arrange
      const sut = render(<Header title="Bla" >foo</Header>);

      //act
      const actual = await screen.findByTestId("header-children");

      //assert
      assert.equal(actual.innerHTML, "foo");
    });
  });
});
