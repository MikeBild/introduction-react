import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingButton from "./LoadingButton";

describe("App", () => {
  it("should render a button with `Loading` content", () => {
    render(<LoadingButton />);
    expect(screen.getByTestId("loading-button").innerHTML).toBe("Loading");
  });
});
