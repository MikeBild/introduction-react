import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

describe("InputField", () => {
  it("renders without properties", () => {
    //arrange
    render(<InputField />);
    //act
    const sut = screen.getByTestId("input-field");
    //assert
    expect(sut).toBeVisible();
    expect(sut).not.toBeEmptyDOMElement();
  });

  it("renders with label", () => {
    //arrange
    render(<InputField label="TestLabel" />);
    //act
    const sut = screen.getByTestId("input-field");
    //assert
    expect(sut).toHaveTextContent("TestLabel");
  });

  it("renders with initial value", () => {
    //arrange
    render(<InputField initialValue="TestValue" />);
    //act
    const sut = screen.getByTestId("input-field").querySelector('input');
    //assert
    expect(sut).toHaveValue('TestValue');
  });

  it("renders with name", () => {
    //arrange
    render(<InputField name="TestName" />);
    //act
    const label = screen.getByTestId("input-field").querySelector('label');
    const inputField = screen.getByTestId("input-field").querySelector('input');
    //assert
    expect(label).toHaveAttribute('for', expect.stringMatching('TestName'))
    expect(inputField).toHaveAttribute('name', expect.stringMatching('TestName'))
  });

  /*
  it("renders with change handler", async () => {
    const handler = (x) => { console.log(x)}
    //arrange
    render(<InputField onValueChange={handler} />);
    //act
    const inputField = screen.getByTestId("input-field").querySelector('input');
    fireEvent.change(input, {})
    // User - Event
    inputField?. = 'FooBar'
    //assert
    expect(label).toHaveAttribute('for', expect.stringMatching('TestName'))
    expect(inputField).toHaveAttribute('name', expect.stringMatching('TestName'))
  });
  */
});
