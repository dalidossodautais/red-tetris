import React from "react";
import renderer from "react-test-renderer";
import TextField from "../../../src/components/inputs/TextField";

describe("TextField", () => {
  test("Standard", () => {
    const component = renderer.create(<TextField />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toBe(null);
    // re-rendering
    tree = component.toJSON();
    expect(tree).toBe(null);
  });
  test("Standard hiden", () => {
    const component = renderer.create(<TextField hide />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toBe(null);
    // re-rendering
    tree = component.toJSON();
    expect(tree).toBe(null);
  });
  test("Outlined", () => {
    const component = renderer.create(<TextField variant="outlined" />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Outlined with reverse theme", () => {
    const component = renderer.create(
      <TextField color="secondary" variant="outlined" />
    );
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
