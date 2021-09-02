import statics from "../statics";

export default function log(...text) {
  if (statics.env !== "test") console.log(...text);
}
