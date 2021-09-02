import React from "react";
import renderer from "react-test-renderer";
import Toolbar from "../../src/components/Toolbar";

describe("Toolbar", () => {
  test("Standard", () => {
    const component = renderer.create(<Toolbar />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
