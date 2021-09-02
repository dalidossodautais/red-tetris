import React from "react";
import { render } from "@testing-library/react";
import Rooms from "../../../src/pages/Home/Rooms";

describe("Rooms", () => {
  it("Basic Render", () => {
    const component = render(<Rooms />);
    expect(component).toMatchSnapshot();
  });
});
