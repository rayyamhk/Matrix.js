const Matrix = require('../..');
const { INVALID_ROW_COL } = require('../../Error');

describe('should get identity matrix', () => {
  it('should get 0x0 identity matrix', () => {
    expect.hasAssertions();
    expect(Matrix.identity(0)._matrix).toStrictEqual([]);
  });

  it('should get 1x1 identity matrix', () => {
    expect.hasAssertions();
    const expected = [[1]];
    expect(Matrix.identity(1)._matrix).toStrictEqual(expected);
  });

  it('should get 2x2 identity matrix', () => {
    expect.hasAssertions();
    const expected = [
      [1, 0],
      [0, 1],
    ];
    expect(Matrix.identity(2)._matrix).toStrictEqual(expected);
  });

  it('should get 3x3 identity matrix', () => {
    expect.hasAssertions();
    const expected = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    expect(Matrix.identity(3)._matrix).toStrictEqual(expected);
  });

  it('should throw errors', () => {
    expect.hasAssertions();
    expect(() => Matrix.identity(-1)).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity(0.12345)).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity(Infinity)).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity(NaN)).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity('abcde')).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity('')).toThrow(INVALID_ROW_COL);
    expect(() => Matrix.identity('3')).toThrow(INVALID_ROW_COL);
  });
});
