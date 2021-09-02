import React from "react";
import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import WelcomeModal from "../../src/pages/WelcomeModal";
import { Context } from "../../src/Provider";

Enzyme.configure({ adapter: new Adapter() });

it("WelcomeModal", () => {
  const wrapper = mount(
    <Context.Provider value={{ setUsernameError: () => null }}>
      <WelcomeModal />
    </Context.Provider>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
  const input = wrapper.find("input");
  input.simulate("keyup", { key: "Enter" });
  input.simulate("change", { target: { value: "Hello" } });
  input.simulate("keyup", { key: "Enter" });
  expect(toJson(wrapper)).toMatchSnapshot();
  const button = wrapper.find("button");
  button.simulate("click");
  expect(toJson(wrapper)).toMatchSnapshot();
});
