import React from "react";
import { render } from "@testing-library/react";
import { RoomContext } from "../../../../src/pages/Room";
import Game from "../../../../src/pages/Room/Game";

describe("Game", () => {
  it("Empty Render", () => {
    const component = render(
      <RoomContext.Provider value={{ playerNames: ["main"], options: [] }}>
        <Game />
      </RoomContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("Filled Render", () => {
    const component = render(
      <RoomContext.Provider
        value={{
          isPlayer: true,
          game_main: { grid: [[null]], next: [[[null, "I", undefined]]] },
          playerNames: ["main", "secondary"],
          options: [{}],
        }}
      >
        <Game />
      </RoomContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("Filled Render", () => {
    const component = render(
      <RoomContext.Provider
        value={{
          isPlayer: false,
          game_main: { grid: [[null]], isPlaying: true },
          game_secondary: { grid: [[null]] },
          playerNames: ["main", "secondary"],
          options: [{}],
        }}
      >
        <Game />
      </RoomContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
