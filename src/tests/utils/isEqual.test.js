const Matrix = require('../..');

describe('should be true', () => {
  const tests = [
    {
      matrix1: [
        [0.1 + 0.2, 23 * 1.4],
        [0.06, 0.07],
      ],
      matrix2: [
        [0.3, 32.2],
        [0.06, 0.07],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      matrix2: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      matrix2: [
        [1.000001, 2, 3.000000002],
        [4, 5, 5.999999],
      ],
    },
  ];

  tests.forEach((test, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const { matrix1, matrix2 } = test;
      const A = new Matrix(matrix1);
      const B = new Matrix(matrix2);
      const received = Matrix.isEqual(A, B);
      expect(received).toBe(true);
    });
  });
});

describe('should be false', () => {
  const tests = [
    {
      matrix1: [
        [0.1 + 0.2, 23 * 1.4],
        [0.06, 0.07],
      ],
      matrix2: [
        [0.4, 32.2],
        [0.06, 0.07],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      matrix2: [
        [1, 2, 3, 4],
        [4, 5, 6, 5],
      ],
    },
    {
      matrix1: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      matrix2: [
        [1.000001, 2, 3.000000002],
        [4, 5, 5.999999],
      ],
    },
  ];

  tests.forEach((test, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const { matrix1, matrix2 } = test;
      const A = new Matrix(matrix1);
      const B = new Matrix(matrix2);
      const received = Matrix.isEqual(A, B);
      expect(received).toBe(false);
    });
  });
});
