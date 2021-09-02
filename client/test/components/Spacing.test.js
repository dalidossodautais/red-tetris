import React from "react";
import renderer from "react-test-renderer";
import Spacing from "../../src/components/Spacing";

describe("Spacing", () => {
  test("Standard", () => {
    const component = renderer.create(<Spacing />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
