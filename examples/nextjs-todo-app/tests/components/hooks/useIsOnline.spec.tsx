import React from "react";
import assert from "assert";
import { renderHook, act } from "@testing-library/react";
import { useIsOnline } from "../../../lib/useIsOnline";

describe("Hooks", () => {
  describe("useIsOnline", () => {
    it("should true", async () => {
      //arrange
      //act
      const { result } = renderHook(() => useIsOnline(true));

      //assert
      assert.equal(result.current, true);
    });
  });
});
