import React from "react";
import { render } from "@testing-library/react";
import Room from "../../../src/pages/Room";

describe("Room", () => {
  it("Basic Render", () => {
    const component = render(<Room />);
    expect(component).toMatchSnapshot();
  });
});
