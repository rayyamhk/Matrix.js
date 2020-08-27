const Matrix = require('../..');

describe('should clone correct matrix', () => {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      it(`test: should clone correct ${i}x${j} matrix`, () => {
        expect.hasAssertions();
        const matrix = Matrix.getRandomMatrix(i, j, -10, 10, 2);
        const cloned = Matrix.clone(matrix);
        expect(cloned._matrix).toStrictEqual(matrix._matrix);
        matrix._matrix[i - 1][j - 1] -= 1; // modify the last entry of the original matrix
        expect(cloned._matrix).not.toStrictEqual(matrix._matrix);
      });
    }
  }
});
