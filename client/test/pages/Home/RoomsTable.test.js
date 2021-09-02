import React from "react";
import { render } from "@testing-library/react";
import RoomsTable from "../../../src/pages/Home/RoomsTable";

describe("RoomsTable", () => {
  it("Basic Render", () => {
    const component = render(<RoomsTable />);
    expect(component).toMatchSnapshot();
  });
});
