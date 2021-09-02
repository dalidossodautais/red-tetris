import React from "react";
import renderer from "react-test-renderer";
import FooterContainer from "../../../src/components/card/FooterContainer";

describe("FooterContainer", () => {
  test("Standard", () => {
    const component = renderer.create(<FooterContainer />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
