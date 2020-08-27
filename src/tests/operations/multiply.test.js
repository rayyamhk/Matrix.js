const Matrix = require('../..');
const { SIZE_INCOMPATIBLE } = require('../../Error');

describe('should get correct product of two matrices', () => {
  const tests = [
    {
      matrix1: [],
      matrix2: [],
      expected: [],
    },
    {
      matrix1: [[1]],
      matrix2: [[2]],
      expected: [[2]],
    },
    {
      matrix1: [[1, 2, 3, 4]],
      matrix2: [
        [5], [6], [7], [8],
      ],
      expected: [[70]],
    },
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
        [8, 5],
        [20, 13],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [3, 4, 5],
      ],
      matrix2: [
        [4, 3],
        [2, 1],
        [0, -1],
      ],
      expected: [
        [8, 2],
        [20, 8],
      ],
    },
    {
      matrix1: [
        [4, 3],
        [2, 1],
        [0, -1],
      ],
      matrix2: [
        [1, 2, 3],
        [3, 4, 5],
      ],
      expected: [
        [13, 20, 27],
        [5, 8, 11],
        [-3, -4, -5],
      ],
    },
    {
      matrix1: [
        [4, 3, -2],
        [2, 1, 0],
        [0, -1, 7],
      ],
      matrix2: [
        [5],
        [2],
        [-1],
      ],
      expected: [
        [28],
        [12],
        [-9],
      ],
    },
    {
      matrix1: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      matrix2: [
        [5, 6, 7, 9],
        [2, -4, 5.54, 7],
        [-1, -2, -5, -10],
      ],
      expected: [
        [5, 6, 7, 9],
        [2, -4, 5.54, 7],
        [-1, -2, -5, -10],
      ],
    },
    {
      matrix1: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      matrix2: [
        [5, 6, 7, 9],
        [2, -4, 5.54, 7],
        [-1, -2, -5, -10],
      ],
      expected: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      matrix1: [
        [0, 3, 0, 3, 0, 2],
        [1, 8, 7, 5, 7, 5],
        [4, 9, 3, 3, 3, 3],
        [2, 1, 5, 1, 9, 8],
      ],
      matrix2: [
        [1, 7, 2],
        [3, 7, 5],
        [8, 5, 6],
        [4, 3, 5],
        [9, 4, 8],
        [6, 3, 2],
      ],
      expected: [
        [33, 36, 34],
        [194, 156, 175],
        [112, 136, 116],
        [178, 109, 132],
      ],
    },
    {
      matrix1: [
        [0, 3, 0, 3, 0, 2],
        [1, 8, 7, 5, 7, 5],
        [4, 9, 3, 3, 3, 3],
        [2, 1, 5, 1, 9, 8],
        [1, 4, 7, 5, 7, 2],
        [1, 8, 7, 5, 0, 5],
      ],
      matrix2: [
        [1, 7, 2, 3, 4, 0],
        [3, 7, 5, -2, 9, 7],
        [8, 5, 6, 4, 2, 5],
        [4, 3, 5, 9, -2, -4],
        [9, 4, 8, 9, 0, -8],
        [6, 3, 2, 21, 5, -2],
      ],
      expected: [
        [33, 36, 34, 63, 31, 5],
        [194, 156, 175, 228, 105, 5],
        [112, 136, 116, 123, 112, 36],
        [178, 109, 132, 282, 65, -60],
        [164, 119, 149, 173, 54, -17],
        [131, 128, 119, 165, 105, 61],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
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
      ],
      matrix2: [
        [1],
        [2],
      ],
      hasError: true,
      expected: SIZE_INCOMPATIBLE,
    },
  ];

  tests.forEach((test, idx) => {
    if (!test.hasError) {
      it(`test ${idx + 1}: should get correct product of two matrices`, () => {
        expect.hasAssertions();
        const { matrix1, matrix2, expected } = test;
        const A = new Matrix(matrix1);
        const B = new Matrix(matrix2);
        const received = Matrix.multiply(A, B)._matrix;
        expect(received).toStrictEqual(expected);
      });
    } else {
      it(`test ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const { matrix1, matrix2, expected } = test;
        const A = new Matrix(matrix1);
        const B = new Matrix(matrix2);
        expect(() => Matrix.multiply(A, B)).toThrow(expected);
      });
    }
  });
});
