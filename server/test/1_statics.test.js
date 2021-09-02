import { assert } from "chai";

import statics from "../src/statics";

describe("statics", function () {
  it("Is an object", function () {
    assert.isObject(statics);
  });
  it("Contains all datas", function () {
    assert.hasAllKeys(statics, ["env", "host", "port"]);
  });
  it("Env is a string", function () {
    assert.isString(statics.env);
  });
  it("Host is a string", function () {
    assert.isString(statics.host);
  });
  it("Port is a number", function () {
    assert.isNumber(statics.port);
  });
});
