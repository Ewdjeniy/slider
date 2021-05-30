import test from '../src/entry.ts';

describe("Module should return", function () {
  it("some number", function () {
    expect(test()).toEqual(10);
  });
});