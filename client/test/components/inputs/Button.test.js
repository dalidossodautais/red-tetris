import React from "react";
import renderer from "react-test-renderer";
import Button from "../../../src/components/inputs/Button";

describe("Button", () => {
  test("Standard", () => {
    const component = renderer.create(<Button />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toBe(null);
    // re-rendering
    tree = component.toJSON();
    expect(tree).toBe(null);
  });
  test("Contained", () => {
    const component = renderer.create(<Button variant="contained" />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Outlined", () => {
    const component = renderer.create(<Button variant="outlined" />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
