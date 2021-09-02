import { useCallback, useEffect, useRef } from "react";
import { playGame } from "../../../middleware";

function useListeners(key, action) {
  const timeout = useRef(null);
  const handleRepeatedKeys = useCallback(
    (time) => {
      timeout.current = setTimeout(() => {
        playGame(action);
        handleRepeatedKeys(50);
      }, time);
    },
    [action]
  );
  const downHandler = useCallback(
    (event) => {
      if (event.key === key && !timeout.current) {
        playGame(action);
        handleRepeatedKeys(400);
      }
    },
    [action, handleRepeatedKeys, key]
  );
  const upHandler = useCallback(
    (event) => {
      if (event.key === key) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    },
    [key]
  );
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      clearTimeout(timeout.current);
    };
  }, [downHandler, upHandler]);
}

export default function Listeners() {
  useListeners("ArrowDown", "down");
  useListeners("ArrowLeft", "left");
  useListeners("ArrowRight", "right");
  useListeners("ArrowUp", "rotate");
  useListeners(" ", "bottom");
  useListeners("0", "keep");
  return null;
}
