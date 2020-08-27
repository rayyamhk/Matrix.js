const Matrix = require('../..');
const { NO_UNIQUE_SOLUTION } = require('../../Error');

describe('should get correct solution', () => {
  for (let size = 1; size < 40; size++) {
    const A = Matrix.getRandomMatrix(size, size, -100, 100, 0);
    const b = Matrix.getRandomMatrix(size, 1, -100, 100, 0);
    try {
      const x1 = Matrix.solve(A, b);
      it(`test: should get correct solution for matrix of size: ${size}`, () => {
        expect.hasAssertions();
        const result = Matrix.multiply(A, x1);
        expect(Matrix.isEqual(result, b)).toBe(true);
      });
    } catch (error) {
      it('test: should throw error', () => {
        expect.hasAssertions();
        expect(error.message).toBe(NO_UNIQUE_SOLUTION);
      });
    }
  }
});
