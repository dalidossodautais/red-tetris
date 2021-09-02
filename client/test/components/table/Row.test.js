import React from "react";
import renderer from "react-test-renderer";
import Row from "../../../src/components/table/Row";

describe("Row", () => {
  test("Standard", () => {
    const component = renderer.create(<Row />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Standard selected", () => {
    const component = renderer.create(<Row selected />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
