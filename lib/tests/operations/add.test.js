const Matrix = require('../..');
const { SIZE_INCOMPATIBLE } = require('../../Error');

describe('should get correct sum of two matrices', () => {
  const tests = [
    {
      matrix1: [
        [1, 2],
        [3, 4],
      ],
      matrix2: [
        [4, 3],
        [2, 1],
      ],
      expected: [
        [5, 5],
        [5, 5],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      matrix2: [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18],
      ],
      expected: [
        [11, 13, 15],
        [17, 19, 21],
        [23, 25, 27],
      ],
    },
    {
      matrix1: [
        [1, 2],
        [3, 4],
      ],
      matrix2: [
        [-4, 3],
        [2, -1],
      ],
      expected: [
        [-3, 5],
        [5, 3],
      ],
    },
    {
      matrix1: [
        [1, 2],
        [3, 4],
      ],
      matrix2: [
        [4.123, 3.123],
        [2.123, 1.123],
      ],
      expected: [
        [5.123, 5.123],
        [5.123, 5.123],
      ],
    },
    {
      matrix1: [
        [1, 2],
        [3, 4],
      ],
      matrix2: [
        [0, 0],
        [0, 0],
      ],
      expected: [
        [1, 2],
        [3, 4],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      matrix2: [
        [7, 9, 2],
        [2, 1, 18],
      ],
      expected: [
        [8, 11, 5],
        [6, 6, 24],
      ],
    },
    {
      matrix1: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      matrix2: [
        [4, 3],
        [2, 1],
        [11, -57],
      ],
      expected: [
        [5, 5],
        [5, 5],
        [16, -51],
      ],
    },
    {
      matrix1: [
        [1],
      ],
      matrix2: [
        [2],
      ],
      expected: [
        [3],
      ],
    },
    {
      matrix1: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ],
      matrix2: [
        [11, 9, 36, -5, 10.2, 8.124, 4, -2, -54.1, 8],
      ],
      expected: [
        [12, 11, 39, -1, 15.2, 14.124, 11, 6, -45.1, 18],
      ],
    },
    {
      matrix1: [
        [1], [2], [3], [4], [5], [6], [7],
      ],
      matrix2: [
        [0], [-10], [95.123], [1 / 3], [Math.PI], [5], [1],
      ],
      expected: [
        [1], [-8], [98.123], [4 + 1 / 3], [5 + Math.PI], [11], [8],
      ],
    },
    {
      matrix1: [],
      matrix2: [],
      expected: [],
    },
    {
      matrix1: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
      ],
      matrix2: Array(12).fill(Array(10).fill(0)),
      expected: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
        [4, 5, 6, 8, 2, 4, 9, 10, 1, 5],
      ],
    },
    {
      matrix1: [
        [1, 2],
        [3, 4],
      ],
      matrix2: [
        [4, 3, 2],
        [2, 1, 0],
      ],
      hasError: true,
      expected: SIZE_INCOMPATIBLE,
    },
    {
      matrix1: [
        [0, 1, 2, 3],
      ],
      matrix2: [
        [1, 2, 3],
      ],
      hasError: true,
      expected: SIZE_INCOMPATIBLE,
    },
    {
      matrix1: [
        [1, 2, 3],
        [3, 4, 5],
      ],
      matrix2: [
        [4, 3],
        [2, 1],
        [1, 2],
      ],
      hasError: true,
      expected: SIZE_INCOMPATIBLE,
    },
    {
      matrix1: [],
      matrix2: [
        [1, 2],
        [3, 4],
      ],
      hasError: true,
      expected: SIZE_INCOMPATIBLE,
    },
  ];

  tests.forEach((test, idx) => {
    if (test.hasError) {
      it(`TEST ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const { matrix1, matrix2, expected } = test;
        const A = new Matrix(matrix1);
        const B = new Matrix(matrix2);
        expect(() => Matrix.add(A, B)).toThrow(expected);
      });
    } else {
      it(`TEST: ${idx + 1}: should get correct sum of two matrices`, () => {
        expect.hasAssertions();
        const { matrix1, matrix2, expected } = test;
        const A = new Matrix(matrix1);
        const B = new Matrix(matrix2);
        expect(Matrix.add(A, B)._matrix).toStrictEqual(expected);
      });
    }
  });
});
