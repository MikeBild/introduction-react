import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Layout from "./Layout";

describe("Layout", () => {
  describe("Story default", () => {
    it("should display app", () => {
      render(<Layout testId="1" loggedInUser="mike" setLoggedInUser={() => {}} />);
      expect(screen.getByTestId("1-app")).toBeDefined();
    });
  });

  describe("Story logged out", () => {
    it("should display login", () => {
      render(<Layout testId="2" loggedInUser={null} setLoggedInUser={() => {}} />);
      expect(screen.getByTestId("2-login")).toBeDefined();
    });
  });

});
