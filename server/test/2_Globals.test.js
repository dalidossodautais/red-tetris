import { assert } from "chai";

import Globals from "../src/utils/Globals";

describe("Globals", function () {
  const testIo = { something: "something" };
  const globals = new Globals(testIo);
  it("Globals are generated", function () {
    assert.deepInclude(globals, {
      io: testIo,
      rooms: [],
      scores: [],
      users: [],
    });
  });
});
