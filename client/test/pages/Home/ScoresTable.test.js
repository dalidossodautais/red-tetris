import React from "react";
import { render } from "@testing-library/react";
import ScoresTable from "../../../src/pages/Home/ScoresTable";

describe("ScoresTable", () => {
  it("Basic Render", () => {
    const component = render(<ScoresTable />);
    expect(component).toMatchSnapshot();
  });
});
