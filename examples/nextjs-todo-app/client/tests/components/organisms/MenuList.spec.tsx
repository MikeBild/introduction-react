import React from "react";
import assert from "assert";
import { render, screen, cleanup } from "@testing-library/react";
import { MenuList } from "../../../components/organisms/MenuList";

describe("Organisms", () => {
  describe("MenuList Component", () => {
    beforeEach(cleanup);
    it("should render MenuList items", async () => {
      //arrange
      render(<MenuList items={[{ text: "Home", url: "/" }, { text: "About", url: "/" }]} />);

      //act
      const actual = await screen.findByTestId("MenuList-ul");

      //assert
      assert.equal(actual.children.length, 2);
    });
  });
});
