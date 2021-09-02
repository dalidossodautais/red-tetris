import React from "react";
import renderer from "react-test-renderer";
import Icon from "../../src/components/Icon";

describe("Icon", () => {
  test("Standard", () => {
    const component = renderer.create(<Icon />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Standard with onClick", () => {
    const component = renderer.create(<Icon onClick={() => true} />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
