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
