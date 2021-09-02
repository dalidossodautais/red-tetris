import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Provider from "../src/Provider";

describe("Provider", () => {
  const renderer = new ShallowRenderer();
  it("Basic Render", () => {
    const component = renderer.render(
      <Provider>
        <div />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
