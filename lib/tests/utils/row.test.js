const Matrix = require('../..');

describe('should receive correct row', () => {
  const tests = [
    {
      matrix: [
        [1, 2, 3, 4],
      ],
      expected: [
        [[1, 2, 3, 4]],
      ],
    },
    {
      matrix: [
        [1], [2], [3], [4],
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
        [1, 2],
        [3, 4],
      ],
      expected: [
        [[1, 2]],
        [[3, 4]],
      ],
    },
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      expected: [
        [[1, 2, 3]],
        [[4, 5, 6]],
        [[7, 8, 9]],
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
        [[1, 2, 3]],
        [[4, 5, 6]],
        [[7, 8, 9]],
        [[1, 2, 3]],
        [[4, 5, 6]],
        [[7, 8, 9]],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4, 5],
        [4, 5, 6, 7, 8],
        [7, 8, 9, 10, 11],
      ],
      expected: [
        [[1, 2, 3, 4, 5]],
        [[4, 5, 6, 7, 8]],
        [[7, 8, 9, 10, 11]],
      ],
    },
  ];

  tests.forEach((test, idx) => {
    const { matrix, expected } = test;
    expected.forEach((expectedRow, row) => {
      it(`test ${idx + 1}: should get row ${row}`, () => {
        expect.hasAssertions();
        const A = new Matrix(matrix);
        const receivedRow = Matrix.row(A, row)._matrix;
        expect(receivedRow).toStrictEqual(expectedRow);
      });
    });
  });
});
