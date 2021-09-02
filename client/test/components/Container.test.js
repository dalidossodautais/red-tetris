import React from "react";
import renderer from "react-test-renderer";
import Container from "../../src/components/Container";

describe("Container", () => {
  test("Standard", () => {
    const component = renderer.create(<Container />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
