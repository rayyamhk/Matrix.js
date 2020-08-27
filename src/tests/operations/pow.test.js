const Matrix = require('../..');
const { INVALID_SQUARE_MATRIX, INVALID_EXPONENT } = require('../../Error');

describe('should get the correct result', () => {
  const tests = [
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 0,
      expected: [
        [1, 0],
        [0, 1],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 1,
      expected: [
        [1, 2],
        [3, 4],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 2,
      expected: [
        [7, 10],
        [15, 22],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 3,
      expected: [
        [37, 54],
        [81, 118],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 4,
      expected: [
        [199, 290],
        [435, 634],
      ],
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 5,
      expected: [
        [1069, 1558],
        [2337, 3406],
      ],
    },
    {
      matrix: [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ],
      exp: 10,
      expected: [
        [512, 0, 512],
        [0, 1, 0],
        [512, 0, 512],
      ],
    },
    {
      matrix: [
        [1, 2, 3],
        [-3, -2, -1],
        [0, 1, 2],
      ],
      exp: 9,
      expected: [
        [136, -113, -362],
        [12, 183, 354],
        [105, -39, -183],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4],
        [-4, -3, -2, -1],
        [0, 1, 0, 2],
        [1, 0, 1, 0],
      ],
      exp: 7,
      expected: [
        [-70, 148, 210, 421],
        [-160, -387, -290, -424],
        [-193, -36, 71, 253],
        [182, 90, 18, -85],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4],
        [-4, -3, -2, -1],
        [0, 1, 0, 2],
        [1, 0, 1, 0],
      ],
      exp: 8,
      expected: [
        [-241, -374, -85, -8],
        [964, 551, -130, -833],
        [204, -207, -254, -594],
        [-263, 112, 281, 674],
      ],
    },
    {
      matrix: [
        [1, 2, 3, 4],
        [-4, -3, -2, -1],
        [0, 1, 0, 2],
      ],
      exp: 8,
      hasError: true,
      expected: INVALID_SQUARE_MATRIX,
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: 1.2,
      hasError: true,
      expected: INVALID_EXPONENT,
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
      ],
      exp: -1,
      hasError: true,
      expected: INVALID_EXPONENT,
    },
  ];

  tests.forEach((test, idx) => {
    if (test.hasError) {
      it(`test ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const { matrix, exp, expected } = test;
        const A = new Matrix(matrix);
        expect(() => Matrix.pow(A, exp)).toThrow(expected);
      });
    } else {
      it(`test ${idx + 1}: should get correct result`, () => {
        expect.hasAssertions();
        const { matrix, exp, expected } = test;
        const A = new Matrix(matrix);
        const received = Matrix.pow(A, exp)._matrix;
        expect(received).toStrictEqual(expected);
      });
    }
  });
});
