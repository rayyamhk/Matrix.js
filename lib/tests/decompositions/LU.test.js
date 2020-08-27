const Matrix = require('../..');

describe('should get correct LU decomposition', () => {
  for (let row = 1; row <= 40; row++) {
    for (let col = 1; col <= 40; col++) {
      it(`test: should get LU decomposition of ${row} by ${col} matrix`, () => {
        expect.hasAssertions();
        const A = Matrix.getRandomMatrix(row, col, -100, 100, 2);
        const [P, L, U] = Matrix.LU(A, false);
        const LU = Matrix.multiply(L, U);
        const PA = Matrix.multiply(P, A);
        expect(Matrix.isEqual(LU, PA)).toBe(true);
        expect(L.isLowerTriangular()).toBe(true);
        expect(U.isUpperTriangular()).toBe(true);
      });
    }
  }

  it('test: should get LU decomposition of matrix', () => {
    expect.hasAssertions();
    const matrix = new Matrix([
      [1, 2, 1],
      [1, 2, 2],
      [2, 1, 1],
    ]);
    const [P, LU] = Matrix.LU(matrix, true);
    expect(P).toStrictEqual([2, 1, 0]);
    expect(LU._matrix).toStrictEqual([
      [2, 1, 1],
      [1 / 2, 3 / 2, 3 / 2],
      [1 / 2, 1, -1],
    ]);
  });

  it('test: should get LU decomposition of 0x0 matrix', () => {
    expect.hasAssertions();
    const matrix = new Matrix([]);
    const [P, L, U] = Matrix.LU(matrix, false);
    const LU = Matrix.multiply(L, U);
    const PA = Matrix.multiply(P, matrix);
    expect(Matrix.isEqual(LU, PA)).toBe(true);
    expect(L.isLowerTriangular()).toBe(true);
    expect(U.isUpperTriangular()).toBe(true);
  });
});
