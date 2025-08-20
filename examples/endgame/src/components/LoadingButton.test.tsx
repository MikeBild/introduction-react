import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import LoadingButton from "./LoadingButton";
import userEvent from "@testing-library/user-event";

describe("LoadingButton", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a button with `Loading` content", () => {
    render(<LoadingButton>Loading</LoadingButton>);
    expect(screen.getByTestId("loading-button")).toHaveTextContent("Loading");
  });

  it("displays  Text der Kinder an, if not loading", () => {
    render(<LoadingButton>Send</LoadingButton>);
    expect(screen.getByTestId("loading-button")).toHaveTextContent("Send");
    expect(screen.getByTestId("loading-button")).not.toBeDisabled();
  });

  it("displays 'Loading...' and is disabled, if loading=true", () => {
    render(<LoadingButton loading>Send</LoadingButton>);
    expect(screen.getByTestId("loading-button")).toHaveTextContent(
      "loading"
    );
    expect(screen.getByTestId("loading-button")).toBeDisabled();
  });

  it("invokes onClick, if not loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<LoadingButton onBtnClick={handleClick}>Send</LoadingButton>);

    await user.click(screen.getByTestId("loading-button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("NOT invokes onClick, if loading=true", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <LoadingButton loading onBtnClick={handleClick}>
        Send
      </LoadingButton>
    );

    await user.click(screen.getByTestId("loading-button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
