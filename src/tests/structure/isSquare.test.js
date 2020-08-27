const Matrix = require('../..');

describe('should be square matrix', () => {
  const matrices = [
    [],
    [
      [1],
    ],
    [
      [1, 2],
      [3, 4],
    ],
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const A = new Matrix(matrix);
      expect(A.isSquare()).toBe(true);
    });
  });
});

describe('should be non-square matrix', () => {
  const matrices = [
    [
      [1, 2],
    ],
    [
      [1, 2, 3],
      [3, 4, 4],
    ],
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    [
      [1, 2, 3, 4, 5],
    ],
    [
      [1],
      [2],
      [3],
      [4],
      [5],
    ],
    [
      [1, 2, 3, 4, 5],
      [4, 5, 6, 7, 8],
      [7, 8, 9, 9, 10],
    ],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const A = new Matrix(matrix);
      expect(A.isSquare()).toBe(false);
    });
  });
});
