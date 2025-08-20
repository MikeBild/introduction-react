import "@testing-library/jest-dom/vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it} from "vitest";
import ToDoList from "./MyToDoList";

describe("MyToDoList", () => {
  describe("when no items are in the list", () => {
    it("should render a text if no items are in the list", () => {
      render(<ToDoList onItemDoneToggle={() => {
      }} onItemRemoved={() => {
      }}/>);
      expect(screen.getByRole("paragraph")).toHaveTextContent("Hurray! There are no more to do's.");
    });
  });

  describe("when there are items in the list", () => {
    beforeEach(() => {
      render(<ToDoList todoList={{
        todos: [
          {
            text: "Item1",
            done: true
          },
          {
            text: "Item2",
            done: false
          }
        ]
      }} onItemRemoved={() => {
      }} onItemDoneToggle={() => {
      }}/>);
    });

    afterEach(() => {
      cleanup();
    })

    it("should render a list", () => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("should render two items in the list", () => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should render the first item with text 'Item1'", () => {
      expect(screen.getByText("Item1")).toBeInTheDocument();
    });

    it("should render the second item with text 'Item2'", () => {
      expect(screen.getByText("Item2")).toBeInTheDocument();
    });

    it("should render the first item as done", () => {
      const item = screen.getByText("Item1").closest("li");
      expect(item).toBeInTheDocument();
      const checkbox = item?.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeChecked();
    });

    it("should render the second item as not done", () => {
      const item = screen.getByText("Item2").closest("li");
      expect(item).toBeInTheDocument();
      const checkbox = item?.querySelector('input[type="checkbox"]');
      expect(checkbox).not.toBeChecked();
    });

    it("should not render the text", () => {
      expect(screen.queryByRole("paragraph")).not.toBeInTheDocument()
    });
  });
})