const Matrix = require('../..');

describe('should get correct diagonal entries', () => {
  for (let row = 1; row < 5; row++) {
    for (let col = 1; col < 5; col++) {
      it(`test: should get correct diagonal entries of an ${row} by ${col} matrix`, () => {
        expect.hasAssertions();
        const A = Matrix.getRandomMatrix(row, col, -10, 10, 2);
        const matrix = A._matrix;
        const size = Math.min(row, col);
        const diagonalEntries = Matrix.getDiag(A);
        for (let i = 0; i < size; i++) {
          expect(diagonalEntries[i]).toBe(matrix[i][i]);
        }
      });
    }
  }
});
