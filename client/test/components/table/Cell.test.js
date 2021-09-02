import React from "react";
import renderer from "react-test-renderer";
import Cell from "../../../src/components/table/Cell";

describe("Cell", () => {
  test("Standard", () => {
    const component = renderer.create(<Cell />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
