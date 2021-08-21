const Matrix = require('../..');

describe('should get correct array', () => {
  it('TEST 1', () => {
    const matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const received = matrix.flatten();
    expect(received).toStrictEqual([1,2,3,4,5,6,7,8,9]);
  });

  it('TEST 2', () => {
    const matrix = new Matrix([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
    const received = matrix.flatten();
    expect(received).toStrictEqual([1,2,3,4,5,6,7,8]);
  });

  it('TEST 3', () => {
    const matrix = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
    const received = matrix.flatten();
    expect(received).toStrictEqual([1,2,3,4,5,6,7,8]);
  });

  it('TEST 4', () => {
    const matrix = new Matrix([]);
    const received = matrix.flatten();
    expect(received).toStrictEqual([]);
  });
});
