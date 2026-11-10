import React from "react";
import assert from "assert";
import { render, screen, cleanup } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading Component", () => {
  beforeEach(cleanup);

  it("isLoading=true, should render 'Loading'", async () => {
    const sut = render(<Loading isLoading={true} />);

    const loadingElement = await screen.findAllByTestId("loading-text");

    assert.strictEqual(loadingElement[0].innerHTML, "Loading");
  });

  it("isLoading=false, should render children", async () => {
    const sut = render(
      <Loading isLoading={false}>
        <h1>Test</h1>
      </Loading>
    );

    const contentElement = await screen.findAllByTestId("loading-content");

    assert.strictEqual(contentElement[0].innerHTML, "<h1>Test</h1>");
  });

  it("isLoading=true, should not render children", () => {
    render(
      <Loading isLoading={true}>
        <h1>Test</h1>
      </Loading>
    );

    return assert.rejects(screen.findAllByTestId("loading-content"));
  });
});
