import React from "react";
import renderer from "react-test-renderer";
import Slider from "../../../src/components/inputs/Slider";

describe("Slider", () => {
  test("Standard", () => {
    const component = renderer.create(<Slider />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
