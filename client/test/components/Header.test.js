import React from "react";
import renderer from "react-test-renderer";
import Header from "../../src/components/Header";

describe("Header", () => {
  test("Standard", () => {
    const component = renderer.create(<Header />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
