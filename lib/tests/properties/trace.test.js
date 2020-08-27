const Matrix = require('../../index');
const { INVALID_SQUARE_MATRIX } = require('../../Error');

describe('should get the trace of matrix', () => {
  const tests = [
    {
      matrix: [],
      hasError: false,
      expected: 0,
    },
    {
      matrix: [[1]],
      hasError: false,
      expected: 1,
    },
    {
      matrix: [[1, 2], [3, 4]],
      hasError: false,
      expected: 5,
    },
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      hasError: false,
      expected: 15,
    },
    {
      matrix: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
      hasError: false,
      expected: 4,
    },
    {
      matrix: Array(10).fill(Array(10).fill(0)),
      hasError: false,
      expected: 0,
    },
    {
      matrix: [
        [1 / 3, 0, 0, 0],
        [0, Math.PI, 0, 0],
        [0, 0, Math.E, 0],
        [0, 0, 0, Math.SQRT2],
      ],
      hasError: false,
      expected: 1 / 3 + Math.PI + Math.E + Math.SQRT2,
    },
    {
      matrix: [
        [1, 2, 3],
        [3, 4, 4],
      ],
      hasError: true,
    },
    {
      matrix: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      hasError: true,
    },
  ];

  tests.forEach((test, idx) => {
    const { hasError } = test;
    if (!hasError) {
      it(`test ${idx + 1}: should get the trace of a matrix`, () => {
        expect.hasAssertions();
        const { matrix, expected } = test;
        const received = new Matrix(matrix).trace();
        expect(received).toBe(expected);
      });
    } else {
      it(`test ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const { matrix } = test;
        const A = new Matrix(matrix);
        expect(() => A.trace()).toThrow(INVALID_SQUARE_MATRIX);
      });
    }
  });
});
