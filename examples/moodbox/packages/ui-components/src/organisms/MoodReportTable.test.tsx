import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { MoodReportTable, MoodReportTableProps } from "./MoodReportTable";

describe("MoodReportTable", () => {
  it("TestIsTableColumn", () => {
    const items: MoodReportTableProps = {
      data: [
        {
          day: new Date(),
          team: "BDA1",
        },
        {
          day: new Date(),
          team: "BDA2",
        },
      ],
    };
    render(<MoodReportTable data={items.data} />);
  });
});