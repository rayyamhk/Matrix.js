const Matrix = require('../..');
const { INVALID_ROW_COL, OVERFLOW_INDEX } = require('../../Error');

describe('should get correct matrix entry', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      it(`test: (${i},${j})-entry should be ${matrix[i][j]}`, () => {
        expect.hasAssertions();
        const A = new Matrix(matrix);
        expect(A.entry(i, j)).toBe(matrix[i][j]);
      });
    }
  }
});

describe('should throw error', () => {
  const A = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  it('should throw error: invalid index 1', () => {
    expect.hasAssertions();
    expect(() => A.entry(-1, 2)).toThrow(INVALID_ROW_COL);
  });
  it('should throw error: invalid index 2', () => {
    expect.hasAssertions();
    expect(() => A.entry(1, 2.5)).toThrow(INVALID_ROW_COL);
  });
  it('should throw error: index overflow 1', () => {
    expect.hasAssertions();
    expect(() => A.entry(3, 2)).toThrow(OVERFLOW_INDEX);
  });
  it('should throw error: index overflow 2', () => {
    expect.hasAssertions();
    expect(() => A.entry(2, 3)).toThrow(OVERFLOW_INDEX);
  });
});
