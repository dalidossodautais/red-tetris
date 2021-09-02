import React from "react";
import { render } from "@testing-library/react";
import { RoomContext } from "../../../../src/pages/Room";
import Lobby from "../../../../src/pages/Room/Lobby";

describe("Lobby", () => {
  it("Empty Render", () => {
    const component = render(
      <RoomContext.Provider value={{ members: [], options: [] }}>
        <Lobby />
      </RoomContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("Filled Render", () => {
    const component = render(
      <RoomContext.Provider value={{ members: [{}], options: [{}] }}>
        <Lobby />
      </RoomContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
