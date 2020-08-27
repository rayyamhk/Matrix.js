const Matrix = require('../..');

describe('should get transpose of matrix', () => {
  const tests = [
    {
      matrix: [],
      expected: [],
    },
    {
      matrix: [[1]],
      expected: [[1]],
    },
    {
      matrix: [[1, 2, 3]],
      expected: [[1], [2], [3]],
    },
    {
      matrix: [[1], [2], [3]],
      expected: [[1, 2, 3]],
    },
    {
      matrix: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      expected: [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7],
      ],
    },
    {
      matrix: [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7],
      ],
      expected: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [9, 8, 7, 6, 5],
        [8, 7, 6, 5, 4],
      ],
      expected: [
        [1, 2, 3, 9, 8],
        [2, 3, 4, 8, 7],
        [3, 4, 5, 7, 6],
        [4, 5, 6, 6, 5],
        [5, 6, 7, 5, 4],
      ],
    },
  ];

  tests.forEach((test, idx) => {
    it(`test ${idx + 1}: should get correct transpose of matrix`, () => {
      expect.hasAssertions();
      const { matrix, expected } = test;
      const A = new Matrix(matrix);
      const received = Matrix.transpose(A)._matrix;
      expect(received).toStrictEqual(expected);
    });
  });
});
