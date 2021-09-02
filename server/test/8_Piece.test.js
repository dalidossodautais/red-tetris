import { assert } from "chai";
import Piece, { pieces } from "../src/Piece";

describe("Piece", function () {
  const indexes = [];
  let piece1, piece2;
  it("Generate first piece", function () {
    piece1 = new Piece(indexes, 0);
    assert.hasAllKeys(piece1, ["coor", "name"]);
    assert.isString(piece1.name);
    assert.isArray(piece1.coor);
    piece1.coor.forEach((line) => {
      assert.isArray(line);
      line.forEach((cell) => {
        assert.hasAllKeys(cell, ["x", "y"]);
        assert.isNumber(cell.x);
        assert.strictEqual(cell.x % 1, 0);
        assert.isNumber(cell.y);
        assert.strictEqual(cell.y % 1, 0);
      });
    });
  });
  it("Generate same first piece", function () {
    piece2 = new Piece(indexes, 0);
    assert.deepEqual(piece1, piece2);
  });
  it("Rotate first piece", function () {
    piece1.rotate();
    assert.hasAllKeys(piece1, ["coor", "name"]);
    assert.isString(piece1.name);
    assert.isArray(piece1.coor);
    piece1.coor.forEach((line) => {
      assert.isArray(line);
      line.forEach((cell) => {
        assert.hasAllKeys(cell, ["x", "y"]);
        assert.isNumber(cell.x);
        assert.strictEqual(cell.x % 1, 0);
        assert.isNumber(cell.y);
        assert.strictEqual(cell.y % 1, 0);
      });
    });
  });
  it("Get printable first piece", function () {
    const printable = piece1.getPrintable();
    assert.isArray(printable);
    printable.forEach((line) => {
      assert.isArray(line);
      line.forEach((cell) => {
        try {
          assert.isNull(cell);
        } catch (e) {
          if (e.expected !== null) throw e;
          assert.isString(cell);
        }
      });
    });
  });
});
