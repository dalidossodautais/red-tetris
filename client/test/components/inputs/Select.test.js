import React from "react";
import renderer from "react-test-renderer";
import Select from "../../../src/components/inputs/Select";

describe("Select", () => {
  test("Standard", () => {
    const component = renderer.create(<Select />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toBe(null);
    // re-rendering
    tree = component.toJSON();
    expect(tree).toBe(null);
  });
  test("Outlined", () => {
    const component = renderer.create(<Select variant="outlined" />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Outlined Filled", () => {
    const component = renderer.create(
      <Select choices={[{}]} variant="outlined" />
    );
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
