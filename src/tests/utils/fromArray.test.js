const Matrix = require('../..');
const { SIZE_INCOMPATIBLE } = require('../../Error');

describe('should generate correct matrix', () => {
  const tests = [
    {
      describe: 'should generate correct matrix from array',
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
      row: 2,
      col: 4,
      expected: new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ]),
    },
    {
      describe: 'should generate correct matrix from array',
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
      row: 4,
      col: 2,
      expected: new Matrix([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ]),
    },
    {
      describe: 'should generate correct matrix from array',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      row: 3,
      col: 3,
      expected: new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    },
    {
      describe: 'should generate correct matrix from array',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      row: 3,
      col: 4,
      err: SIZE_INCOMPATIBLE,
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST ${idx + 1}: ${test.describe}`, () => {
      expect.hasAssertions();
      const {
        arr,
        row,
        col,
        expected,
        err,
      } = test;
      if (err) {
        expect(() => Matrix.fromArray(arr, row, col)).toThrow(SIZE_INCOMPATIBLE);
      } else {
        const received = Matrix.fromArray(arr, row, col);
        expect(received).toStrictEqual(expected);
      }
    });
  });
});
