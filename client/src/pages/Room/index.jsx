import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { handleRoom, unhandleRoom } from "../../middleware";
import { Context } from "../../Provider";
import Game from "./Game";
import Lobby from "./Lobby";

export const RoomContext = createContext({});

export default function Room() {
  const [room, setRoom] = useReducer(
    (room, newRoom) => ({ ...room, ...newRoom }),
    {}
  );
  const setGame = useCallback(
    (game, playerName) => setRoom({ [`game_${playerName}`]: game }),
    [setRoom]
  );
  const { username } = useContext(Context);
  useEffect(() => {
    handleRoom(setRoom, username);
    return () => {
      unhandleRoom();
    };
  }, [setRoom, username]);
  return (
    Object.keys(room).length > 0 && (
      <RoomContext.Provider value={{ ...room, setGame }}>
        {room.isRunning ? <Game /> : <Lobby />}
      </RoomContext.Provider>
    )
  );
}
