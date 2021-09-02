import React from "react";
import renderer from "react-test-renderer";
import MainTitle from "../../../src/components/texts/MainTitle";

describe("MainTitle", () => {
  test("Standard", () => {
    const component = renderer.create(<MainTitle />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
