const Matrix = require('../..');

describe('should get correct QR decomposition', () => {
  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 30; j++) {
      it(`test: row ${i} col ${j}`, () => {
        expect.hasAssertions();
        const matrix = Matrix.getRandomMatrix(i, j, -5, 5, 1);
        const [Q, R] = Matrix.QR(matrix);
        expect(Q.size()).toStrictEqual([i, i]);
        expect(R.size()).toStrictEqual([i, j]);
        const product = Matrix.multiply(Q, R);
        expect(Q.isOrthogonal(5)).toBe(true);
        expect(R.isUpperTriangular()).toBe(true);
        expect(Matrix.isEqual(product, matrix)).toBe(true);
      });
    }
  }

  it('test: should get QR decomposition of 0x0 matrix', () => {
    expect.hasAssertions();
    const matrix = new Matrix([]);
    const [Q, R] = Matrix.QR(matrix);
    expect(Q.size()).toStrictEqual([0, 0]);
    expect(R.size()).toStrictEqual([0, 0]);
    const product = Matrix.multiply(Q, R);
    expect(Q.isOrthogonal()).toBe(true);
    expect(R.isUpperTriangular()).toBe(true);
    expect(Matrix.isEqual(product, matrix)).toBe(true);
  });

  it('test: should get QR decomposition of matrix', () => {
    expect.hasAssertions();
    const matrix = new Matrix([
      [12, -51, 4],
      [6, 167, -68],
      [-4, 24, -41],
    ]);
    const [Q, R] = Matrix.QR(matrix);
    expect(Q.size()).toStrictEqual([3, 3]);
    expect(R.size()).toStrictEqual([3, 3]);
    expect(Matrix.isEqual(Q, new Matrix([
      [-0.8571428571428571, 0.3942857142857143, 0.33142857142857146],
      [-0.42857142857142855, -0.9028571428571428, -0.034285714285714364],
      [0.2857142857142857, -0.17142857142857143, 0.9428571428571428],
    ]))).toBe(true);
    expect(Matrix.isEqual(R, new Matrix([
      [-14, -21, 14],
      [0, -175, 70],
      [0, 0, -35],
    ]))).toBe(true);
    const product = Matrix.multiply(Q, R);
    expect(Q.isOrthogonal()).toBe(true);
    expect(R.isUpperTriangular()).toBe(true);
    expect(Matrix.isEqual(product, matrix)).toBe(true);
  });
});
