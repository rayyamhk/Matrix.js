const Matrix = require('../..');
const {
  INVALID_UPPER_TRIANGULAR_MATRIX,
  NO_UNIQUE_SOLUTION,
  SIZE_INCOMPATIBLE,
  INVALID_SQUARE_MATRIX,
} = require('../../Error');

describe('should get correct coefficients', () => {
  const max = 100;
  const min = -100;
  const error = 1 / ((10 * 8) * 2);

  for (let size = 1; size < 20; size++) {
    it(`test: matrix size ${size}`, () => {
      expect.hasAssertions();
      const U = Matrix.generate(size, size, (i, j) => {
        if (i > j) {
          return 0;
        }
        if (i < j) {
          return Number.parseFloat((Math.random() * (max - min) + min));
        }
        let entry = Number.parseFloat((Math.random() * (max - min) + min));
        while (Math.abs(entry) < error) {
          entry = Number.parseFloat((Math.random() * (max - min) + min));
        }
        return entry;
      });
      const y = Matrix.generate(
        size, 1, () => Number.parseFloat((Math.random() * (max - min) + min)),
      );
      const coefficients = Matrix.backward(U, y);
      const product = Matrix.multiply(U, coefficients);
      expect(Matrix.isEqual(product, y)).toBe(true);
    });
  }

  const tests = [
    {
      U: new Matrix([
        [1, -6],
        [0, 3],
      ]),
      y: new Matrix([
        [5], [3],
      ]),
    },
    {
      U: new Matrix([
        [1, -2, 1 / 3],
        [0, 3, 9],
        [0, 0, 3],
      ]),
      y: new Matrix([
        [5], [3], [7],
      ]),
    },
    {
      U: new Matrix([
        [1, 0.001, 0.456],
        [0, 3, 1 / 20],
        [0, 0, 3],
      ]),
      y: new Matrix([
        [0], [-3], [5.5],
      ]),
    },
    {
      U: new Matrix([
        [1, 1 / 3, 1],
        [0, 1 / 3, -2 / 7],
        [0, 0, 3 / 5],
      ]),
      y: new Matrix([
        [0], [-3 / 7], [5.525],
      ]),
    },
    {
      U: new Matrix([
        [1, 1 / 3, 1, 6.123],
        [0, 1 / 3, -2 / 7, 0],
        [0, 0, 3 / 5, -3 / 2],
        [0, 0, 0, 5],
      ]),
      y: new Matrix([
        [0], [-3 / 7], [5.525], [1.234],
      ]),
    },
    {
      U: new Matrix([
        [1, 1],
        [2, 2],
      ]),
      y: new Matrix([
        [1], [2],
      ]),
      hasError: true,
      error: INVALID_UPPER_TRIANGULAR_MATRIX,
    },
    {
      U: new Matrix([
        [1, 2, 105],
        [0, 2, 3],
        [0.0001, 0, 3],
      ]),
      y: new Matrix([
        [1], [2], [3],
      ]),
      hasError: true,
      error: INVALID_UPPER_TRIANGULAR_MATRIX,
    },
    {
      U: new Matrix([
        [1, 2, 3],
        [0, 0, 3],
        [0, 0, 3],
      ]),
      y: new Matrix([
        [1], [2], [3],
      ]),
      hasError: true,
      error: NO_UNIQUE_SOLUTION,
    },
    {
      U: new Matrix([
        [1, 2, 3],
        [0, 0, 3],
        [0, 0, 3],
      ]),
      y: new Matrix([
        [1], [2], [3], [4],
      ]),
      hasError: true,
      error: SIZE_INCOMPATIBLE,
    },
    {
      U: new Matrix([
        [1, 2, 3],
        [0, 0, 3],
        [0, 0, 3],
      ]),
      y: new Matrix([
        [1, 2], [2, 3], [3, 4],
      ]),
      hasError: true,
      error: SIZE_INCOMPATIBLE,
    },
    {
      U: new Matrix([
        [1, 2, 3],
        [0, 0, 3],
        [0, 0, 3],
        [0, 0, 0],
      ]),
      y: new Matrix([
        [1], [2], [3],
      ]),
      hasError: true,
      error: INVALID_SQUARE_MATRIX,
    },
  ];

  tests.forEach((test, idx) => {
    if (test.hasError) {
      it(`test ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const {
          U,
          y,
          error: errorMsg,
        } = test;
        expect(() => Matrix.backward(U, y)).toThrow(errorMsg);
      });
    } else {
      it(`test ${idx + 1}: should get correct coefficients`, () => {
        expect.hasAssertions();
        const { U, y } = test;
        const coeff = Matrix.backward(U, y);
        const product = Matrix.multiply(U, coeff);
        expect(Matrix.isEqual(product, y, 3)).toBe(true);
      });
    }
  });
});
