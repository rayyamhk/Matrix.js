const Matrix = require('../..');

describe('should get correct square matrix with numbers as argument', () => {
  const args = [
    [],
    [1],
    [1, 1],
    [1, 1, 1],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [0, 0, 0],
    [1, 0, 1],
  ];
  args.forEach((arg, idx) => {
    it(`TEST ${idx + 1}: should get correct square matrix`, () => {
      expect.hasAssertions();
      const matrix = Matrix.diag(arg);
      expect(matrix.isSquare()).toBe(true);
      expect(matrix.isUpperTriangular()).toBe(true);
      expect(matrix.isLowerTriangular()).toBe(true);
    });
  });
});

describe('should get diagonal block matrix', () => {
  it('array of 0x0 matrices', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([]),
      new Matrix([]),
      new Matrix([]),
      new Matrix([]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([]);
  });

  it('array of 1x1 matrics', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([[1]]),
      new Matrix([[2]]),
      new Matrix([[3]]),
      new Matrix([[4]]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [1, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 4],
    ]);
  });

  it('array of 2x2 matrices', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([
        [1, 2],
        [3, 4],
      ]),
      new Matrix([
        [5, 6],
        [7, 8],
      ]),
      new Matrix([
        [9, 10],
        [11, 12],
      ]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [1, 2, 0, 0, 0, 0],
      [3, 4, 0, 0, 0, 0],
      [0, 0, 5, 6, 0, 0],
      [0, 0, 7, 8, 0, 0],
      [0, 0, 0, 0, 9, 10],
      [0, 0, 0, 0, 11, 12],
    ]);
  });

  it('array of 3x3 matrices', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
      new Matrix([
        [-1, -2, -3],
        [-4, -5, -6],
        [-7, -8, -9],
      ]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [1, 2, 3, 0, 0, 0],
      [4, 5, 6, 0, 0, 0],
      [7, 8, 9, 0, 0, 0],
      [0, 0, 0, -1, -2, -3],
      [0, 0, 0, -4, -5, -6],
      [0, 0, 0, -7, -8, -9],
    ]);
  });

  it('array of combination of square matrices', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([]),
      new Matrix([[1]]),
      new Matrix([
        [2, 3], [4, 5],
      ]),
      new Matrix([
        [6, 7, 8], [9, 10, 11], [12, 13, 14],
      ]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0, 0],
      [0, 4, 5, 0, 0, 0],
      [0, 0, 0, 6, 7, 8],
      [0, 0, 0, 9, 10, 11],
      [0, 0, 0, 12, 13, 14],
    ]);
  });

  it('array of combination of square matrices 2', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([
        [6, 7, 8], [9, 10, 11], [12, 13, 14],
      ]),
      new Matrix([
        [2, 3], [4, 5],
      ]),
      new Matrix([[1]]),
      new Matrix([]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [6, 7, 8, 0, 0, 0],
      [9, 10, 11, 0, 0, 0],
      [12, 13, 14, 0, 0, 0],
      [0, 0, 0, 2, 3, 0],
      [0, 0, 0, 4, 5, 0],
      [0, 0, 0, 0, 0, 1],
    ]);
  });

  it('array of combination of square matrices 3', () => {
    expect.hasAssertions();
    const args = [
      new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]),
      new Matrix([]),
      new Matrix([
        [1, 2],
        [3, 4],
      ]),
      new Matrix([]),
      new Matrix([
        [5],
      ]),
    ];
    const matrix = Matrix.diag(args)._matrix;
    expect(matrix).toStrictEqual([
      [1, 2, 3, 4, 0, 0, 0],
      [5, 6, 7, 8, 0, 0, 0],
      [9, 10, 11, 12, 0, 0, 0],
      [13, 14, 15, 16, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 0],
      [0, 0, 0, 0, 3, 4, 0],
      [0, 0, 0, 0, 0, 0, 5],
    ]);
  });
});
