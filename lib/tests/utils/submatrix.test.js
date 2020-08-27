const Matrix = require('../..');
const {
  EXPECTED_STRING_NUMBER_AT_POS_1_2,
  INVALID_ROW,
  INVALID_ROWS_EXPRESSION,
  OVERFLOW_ROW,
} = require('../../Error');

describe('should get correct submatrix', () => {
  it('test 1', () => {
    expect.hasAssertions();
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const A = new Matrix(matrix);
    expect(Matrix.submatrix(A, ':', ':')._matrix).toStrictEqual(matrix);
    expect(Matrix.submatrix(A, 0, ':')._matrix).toStrictEqual([
      [1, 2, 3],
    ]);
    expect(Matrix.submatrix(A, '0:0', ':')._matrix).toStrictEqual([
      [1, 2, 3],
    ]);
    expect(Matrix.submatrix(A, '0:1', ':')._matrix).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(Matrix.submatrix(A, '2:', ':')._matrix).toStrictEqual([
      [7, 8, 9],
    ]);
    expect(Matrix.submatrix(A, ':', '0:')._matrix).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(Matrix.submatrix(A, ':', '1:')._matrix).toStrictEqual([
      [2, 3],
      [5, 6],
      [8, 9],
    ]);
    expect(Matrix.submatrix(A, ':', '2:')._matrix).toStrictEqual([
      [3], [6], [9],
    ]);
    expect(Matrix.submatrix(A, ':', 0)._matrix).toStrictEqual([
      [1], [4], [7],
    ]);
    expect(Matrix.submatrix(A, ':', '0:1')._matrix).toStrictEqual([
      [1, 2], [4, 5], [7, 8],
    ]);
    expect(Matrix.submatrix(A, ':', '1:2')._matrix).toStrictEqual([
      [2, 3],
      [5, 6],
      [8, 9],
    ]);
    expect(Matrix.submatrix(A, '0:1', '0:1')._matrix).toStrictEqual([
      [1, 2],
      [4, 5],
    ]);
    expect(Matrix.submatrix(A, '0:1', '1:2')._matrix).toStrictEqual([
      [2, 3],
      [5, 6],
    ]);
  });

  it('test 2', () => {
    expect.hasAssertions();
    const matrix = [
      [1, 2, 3, 4, 5, 6, 7],
    ];
    const A = new Matrix(matrix);
    expect(Matrix.submatrix(A, 0, '0:4')._matrix).toStrictEqual([
      [1, 2, 3, 4, 5],
    ]);
    expect(Matrix.submatrix(A, 0, 5)._matrix).toStrictEqual([[6]]);
  });
});

describe('should throw error', () => {
  it('failed tests', () => {
    expect.hasAssertions();
    const matrix = [
      [1, 2, 3],
    ];
    const A = new Matrix(matrix);

    const badArgs1 = [
      [],
      {},
      () => {},
      /^test$/,
      new Date(),
    ];

    badArgs1.forEach((arg) => {
      expect(() => Matrix.submatrix(A, arg, ':')).toThrow(EXPECTED_STRING_NUMBER_AT_POS_1_2);
    });

    const badArgs2 = [
      1.234,
      -1,
      -0.001,
      Math.PI,
      NaN,
      Infinity,
      +1.1,
      '-1:2',
      'NaN:1',
      'a:b',
    ];
    badArgs2.forEach((arg) => {
      expect(() => Matrix.submatrix(A, arg, ':')).toThrow(INVALID_ROW);
    });

    const badArgs3 = [
      '1',
      '',
      '1:2:3',
    ];

    badArgs3.forEach((arg) => {
      expect(() => Matrix.submatrix(A, arg, ':')).toThrow(INVALID_ROWS_EXPRESSION);
    });

    const badArgs4 = [
      '1:1.1',
      '3:4',
      '0:3',
      '4:3',
      '2:1',
    ];

    badArgs4.forEach((arg) => {
      expect(() => Matrix.submatrix(A, arg, ':')).toThrow(OVERFLOW_ROW);
    });
  });
});
