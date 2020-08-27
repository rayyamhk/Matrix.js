const Matrix = require('../..');
const {
  INVALID_LOWER_TRIANGULAR_MATRIX,
  NO_UNIQUE_SOLUTION,
  SIZE_INCOMPATIBLE,
  INVALID_SQUARE_MATRIX,
} = require('../../Error');

describe('random tests', () => {
  const max = 100;
  const min = -100;
  const error = 1 / ((10 ** 5) * 2);

  for (let size = 1; size < 20; size++) {
    it(`test: matrix size ${size}`, () => {
      expect.hasAssertions();
      const L = Matrix.generate(size, size, (i, j) => {
        if (i < j) {
          return 0;
        }
        if (i > j) {
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
      const coefficients = Matrix.forward(L, y);
      const product = Matrix.multiply(L, coefficients);
      expect(Matrix.isEqual(product, y)).toBe(true);
    });
  }

  const tests = [
    {
      L: new Matrix([
        [1, 0],
        [5, 3],
      ]),
      y: new Matrix([
        [5], [3],
      ]),
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [5, 3, 0],
        [1, 2, 3],
      ]),
      y: new Matrix([
        [5], [3], [7],
      ]),
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [0, 3, 0],
        [1, -2, 3],
      ]),
      y: new Matrix([
        [0], [-3], [5.5],
      ]),
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [1 / 3, 1 / 3, 0],
        [1, -2 / 7, 3 / 5],
      ]),
      y: new Matrix([
        [0], [-3 / 7], [5.525],
      ]),
    },
    {
      L: new Matrix([
        [1, 0, 0, 0],
        [1 / 3, 1 / 3, 0, 0],
        [1, -2 / 7, 3 / 5, 0],
        [6.123, 0, -3 / 2, 5],
      ]),
      y: new Matrix([
        [0], [-3 / 7], [5.525], [1.234],
      ]),
    },
    {
      L: new Matrix([
        [1, 1],
        [2, 2],
      ]),
      y: new Matrix([
        [1], [2],
      ]),
      hasError: true,
      error: INVALID_LOWER_TRIANGULAR_MATRIX,
    },
    {
      L: new Matrix([
        [1, 0, 0.001],
        [2, 2, 0],
        [3, 3, 3],
      ]),
      y: new Matrix([
        [1], [2], [3],
      ]),
      hasError: true,
      error: INVALID_LOWER_TRIANGULAR_MATRIX,
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [2, 0, 0],
        [3, 3, 3],
      ]),
      y: new Matrix([
        [1], [2], [3],
      ]),
      hasError: true,
      error: NO_UNIQUE_SOLUTION,
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [2, 0, 0],
        [3, 3, 3],
      ]),
      y: new Matrix([
        [1], [2], [3], [4],
      ]),
      hasError: true,
      error: SIZE_INCOMPATIBLE,
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [2, 0, 0],
        [3, 3, 3],
      ]),
      y: new Matrix([
        [1, 2],
        [2, 3],
        [3, 4],
      ]),
      hasError: true,
      error: SIZE_INCOMPATIBLE,
    },
    {
      L: new Matrix([
        [1, 0, 0],
        [2, 0, 0],
        [3, 3, 3],
        [4, 5, 6],
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
        const { L, y, error: errorMsg } = test;
        expect(() => Matrix.forward(L, y)).toThrow(errorMsg);
      });
    } else {
      it(`test ${idx + 1}: should get correct coefficients`, () => {
        expect.hasAssertions();
        const { L, y } = test;
        const coeff = Matrix.forward(L, y);
        const product = Matrix.multiply(L, coeff);
        expect(Matrix.isEqual(product, y, 3)).toBe(true);
      });
    }
  });
});
