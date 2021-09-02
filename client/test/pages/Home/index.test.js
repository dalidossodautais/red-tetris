import React from "react";
import { render } from "@testing-library/react";
import Home from "../../../src/pages/Home";

describe("Home", () => {
  it("Basic Render", () => {
    const component = render(<Home />);
    expect(component).toMatchSnapshot();
  });
});
