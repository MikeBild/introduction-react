import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingButton from "./LoadingButton";
import userEvent from "@testing-library/user-event";

describe("LoadingButton", () => {
  describe("Story default", () => {
    it("should render a button with `Loading` content", () => {
      render(<LoadingButton testId="1">Loading</LoadingButton>);
      expect(screen.getByTestId("1")).toHaveTextContent("Loading");
    });

    it("displays Text, if not loading", () => {
      render(<LoadingButton testId="2">Send</LoadingButton>);
      expect(screen.getByTestId("2")).toHaveTextContent("Send");
      expect(screen.getByTestId("2")).not.toBeDisabled();
    });

    it("displays 'Loading...' and is disabled, if loading=true", () => {
      render(
        <LoadingButton testId="3" loading>
          Send
        </LoadingButton>
      );
      expect(screen.getByTestId("3")).toHaveTextContent("loading");
      expect(screen.getByTestId("3")).toBeDisabled();
    });

    it("invokes onClick, if not loading", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<LoadingButton testId="4" onBtnClick={handleClick}>Send</LoadingButton>);

      await user.click(screen.getByTestId("4"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("NOT invokes onClick, if loading=true", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <LoadingButton testId="5" loading onBtnClick={handleClick}>
          Send
        </LoadingButton>
      );

      await user.click(screen.getByTestId("5"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
