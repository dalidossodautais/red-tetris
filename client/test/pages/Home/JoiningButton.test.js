import React from "react";
import { render } from "@testing-library/react";
import JoiningButton from "../../../src/pages/Home/JoiningButton";

describe("JoiningButton", () => {
  it("Basic Render", () => {
    const component = render(<JoiningButton />);
    expect(component).toMatchSnapshot();
  });
});
