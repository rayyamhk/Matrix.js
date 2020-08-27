const Matrix = require('../..');

describe('should receive correct column', () => {
  const tests = [
    {
      matrix: [
        [1, 2, 3, 4],
      ],
      expected: [
        [[1]],
        [[2]],
        [[3]],
        [[4]],
      ],
    },
    {
      matrix: [
        [1], [2], [3], [4],
      ],
      expected: [
        [[1], [2], [3], [4]],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      expected: [
        [[1], [3]],
        [[2], [4]],
      ],
    },
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      expected: [
        [[1], [4], [7]],
        [[2], [5], [8]],
        [[3], [6], [9]],
      ],
    },
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      expected: [
        [[1], [4], [7], [1], [4], [7]],
        [[2], [5], [8], [2], [5], [8]],
        [[3], [6], [9], [3], [6], [9]],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4, 5],
        [4, 5, 6, 7, 8],
        [7, 8, 9, 10, 11],
      ],
      expected: [
        [[1], [4], [7]],
        [[2], [5], [8]],
        [[3], [6], [9]],
        [[4], [7], [10]],
        [[5], [8], [11]],
      ],
    },
  ];

  tests.forEach((test, idx) => {
    const { matrix, expected } = test;
    expected.forEach((expectedColumn, col) => {
      it(`test ${idx + 1}: should get column ${col}`, () => {
        expect.hasAssertions();
        const A = new Matrix(matrix);
        const column = Matrix.column(A, col)._matrix;
        expect(column).toStrictEqual(expectedColumn);
      });
    });
  });
});
