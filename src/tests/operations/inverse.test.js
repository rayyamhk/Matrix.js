const Matrix = require('../..');
const { SINGULAR_MATRIX, INVALID_SQUARE_MATRIX } = require('../../Error');

describe('should get inverse of matrix', () => {
  for (let size = 0; size < 20; size++) {
    it(`TEST: should get the inverse of matrix with size ${size}`, () => {
      // Note that there's chance that a random matrix can be non-invertible.
      // Run the test again.
      expect.hasAssertions();
      const matrix = Matrix.getRandomMatrix(size, size, -100, 100, 3);
      const inverse = Matrix.inverse(matrix);
      const product1 = Matrix.multiply(inverse, matrix);
      const product2 = Matrix.multiply(matrix, inverse);
      const I = Matrix.identity(size);

      expect(Matrix.isEqual(product1, I)).toBe(true);
      expect(Matrix.isEqual(product2, I)).toBe(true);
    });
  }
});

describe('should get correct inverse of matrix', () => {
  const tests = [
    {
      matrix: new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 2, 9],
      ]),
      expected: new Matrix([
        [-11/12, 1/3, 1/12],
        [-1/6, 1/3, -1/6],
        [3/4, -1/3, 1/12]
      ]),
    },
    {
      matrix: new Matrix([
        [-11/12, 1/3, 1/12],
        [-1/6, 1/3, -1/6],
        [3/4, -1/3, 1/12]
      ]),
      expected: new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 2, 9],
      ]),
    },
    {
      matrix: new Matrix([
        [1, 3, 5, 9],
        [1, 3, 1, 7],
        [4, 3, 9, 7],
        [5, 2, 0, 9],
      ]),
      expected: new Matrix([
        [-13/47, 2/47, 7/47, 6/47],
        [-5/8, 7/8, 1/4, -1/4],
        [39/376, -53/376, 13/188, -9/188],
        [55/188, -41/188, -13/94, 9/94],
      ]),
    },
    {
      matrix: new Matrix([
        [-13/47, 2/47, 7/47, 6/47],
        [-5/8, 7/8, 1/4, -1/4],
        [39/376, -53/376, 13/188, -9/188],
        [55/188, -41/188, -13/94, 9/94],
      ]),
      expected: new Matrix([
        [1, 3, 5, 9],
        [1, 3, 1, 7],
        [4, 3, 9, 7],
        [5, 2, 0, 9],
      ]),
    },
  ];

  tests.forEach((test, index) => {
    it(`TEST ${index}: should get correct inverse`, () => {
      expect.hasAssertions();
      const { matrix, expected } = test;
      const received = Matrix.inverse(matrix);
      expect(Matrix.isEqual(received, expected)).toBe(true);
    });
  });
});

describe('should throw error', () => {
  const tests = [
    {
      matrix: [
        [1, 0],
        [0, 0],
      ],
      expected: SINGULAR_MATRIX,
    },
    {
      matrix: [
        [1, 0, 3],
        [0, 0, 4],
      ],
      expected: INVALID_SQUARE_MATRIX,
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST ${idx + 1}: should throw error`, () => {
      expect.hasAssertions();
      const { matrix, expected } = test;
      const A = new Matrix(matrix);
      expect(() => Matrix.inverse(A)).toThrow(expected);
    });
  });
});
