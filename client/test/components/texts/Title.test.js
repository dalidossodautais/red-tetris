import React from "react";
import renderer from "react-test-renderer";
import Title from "../../../src/components/texts/Title";

describe("Title", () => {
  test("Standard", () => {
    const component = renderer.create(<Title />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
