import React from "react";
import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import App from "../src/App";

Enzyme.configure({ adapter: new Adapter() });

it("renders correctly enzyme", () => {
  const wrapper = mount(<App />);
  expect(toJson(wrapper)).toMatchSnapshot();
  wrapper.unmount();
  expect(toJson(wrapper)).toMatchSnapshot();
});
