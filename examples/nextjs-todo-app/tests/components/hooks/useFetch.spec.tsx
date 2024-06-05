import React from "react";
import assert from "assert";
import { renderHook, act } from "@testing-library/react";
import { useFetch } from "../../../lib/useFetch";

describe("Hooks", () => {
  describe("useFetch", () => {
    it("should true", async () => {
      //arrange
      const { result } = renderHook(() => useFetch());

      //act
      await act(async () => {
        // const zz = await result.current.fetchData("http://www.google.com");
        //assert
        // assert.notEqual(zz, null);
      });
    });
  });
});
