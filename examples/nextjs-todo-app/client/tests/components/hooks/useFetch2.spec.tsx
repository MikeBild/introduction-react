import React from "react";
import assert from "assert";
import { renderHook, act } from "@testing-library/react";
import { useFetch } from "../../../lib/useFetch2";

describe("Hooks", () => {
  describe("useFetch", () => {
    it("should true", async () => {
      //arrange
      const { result } = renderHook(() => useFetch("https://www.google.com"));

      //act
      await act(async () => {
        const data = await result.current.fetchData("/about");
        //assert
        assert.notEqual(data, null);
      });
    });
  });
});
