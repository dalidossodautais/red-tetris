import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CreationButton from "../../../src/pages/Home/CreationButton";

describe("CreationButton", () => {
  test("Standard", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CreationButton />);
    const result = renderer.getRenderOutput();
    // rendering
    expect(result).toMatchSnapshot();
    // re-rendering
    expect(result).toMatchSnapshot();
    expect(result.props.children[0]).toMatchSnapshot();
  });
});
