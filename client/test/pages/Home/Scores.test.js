import React from "react";
import { render } from "@testing-library/react";
import Scores from "../../../src/pages/Home/Scores";

describe("Scores", () => {
  it("Basic Render", () => {
    const component = render(<Scores />);
    expect(component).toMatchSnapshot();
  });
});
