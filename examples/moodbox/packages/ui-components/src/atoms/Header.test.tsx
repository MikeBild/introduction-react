import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("App", () => {
  it("renders headline", () => {
    //arrange
    render(<Header />);
    //act
    const sut = screen.getByTestId("headlines");
    //assert
    expect(sut).toHaveTextContent("Hello React!");
  });
});
