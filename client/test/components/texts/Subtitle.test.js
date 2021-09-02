import React from "react";
import renderer from "react-test-renderer";
import Subtitle from "../../../src/components/texts/Subtitle";

describe("Subtitle", () => {
  test("Standard", () => {
    const component = renderer.create(<Subtitle />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
