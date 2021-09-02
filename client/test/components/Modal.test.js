import React from "react";
import renderer from "react-test-renderer";
import Modal from "../../src/components/Modal";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Modal", () => {
  test("Standard", () => {
    const component = renderer.create(<Modal />);
    // rendering
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Standard opened", () => {
    const component = shallow(<Modal open={true}></Modal>);
    // rendering
  });
});
