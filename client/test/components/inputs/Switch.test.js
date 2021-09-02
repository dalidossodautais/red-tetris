import React from "react";
import renderer from "react-test-renderer";
import Switch from "../../../src/components/inputs/Switch";

describe("Switch", () => {
  test("Standard", () => {
    const component = renderer.create(<Switch />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
