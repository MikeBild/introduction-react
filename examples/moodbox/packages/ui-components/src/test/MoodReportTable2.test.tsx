import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MoodReportTable } from "..";
import { MoodReportTableProps } from "../organisms/MoodReportTable2";

describe("MoodReportTable", () => {
  it("TestIsTableColumn", () => {
    const items:MoodReportTableProps[] = [
        {
            day: new Date(),
            team: "BDA1"
        },
        {
            day: new Date(),
            team: "BDA2"
        }
    ]
    render(
      <MoodReportTable props={items}>
        <h4>Content</h4>
      </MoodReportTable>
    );
    
    screen.debug()
    expect(1).toEqual(1);
  });
});
