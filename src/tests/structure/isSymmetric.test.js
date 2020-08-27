const Matrix = require('../..');

describe('should be symmetric', () => {
  const matrices = [
    [],
    [
      [0],
    ],
    [
      [1, 2],
      [2, 1],
    ],
    [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ],
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [1, 0, 0],
      [0, 10, 0],
      [0, 0, -2],
    ],
    [
      [1, 4, 3],
      [4, 5, 4],
      [3, 4, 5],
    ],
    [
      [1, 2, 3, 4],
      [2, 3, 4, 10],
      [3, 4, 10, -55],
      [4, 10, -55, 505],
    ],
  ];

  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const A = new Matrix(matrix);
      expect(A.isSymmetric()).toBe(true);
    });
  });
});

describe('should be non-symmetric', () => {
  const matrices = [
    [
      [0, 1, 2, 3, 4],
    ],
    [
      [0],
      [1],
      [2],
      [3],
    ],
    [
      [1, 2],
      [3, 4],
    ],
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    [
      [1, 2, 3],
      [2, 3, 4],
    ],
    [
      [1, 4, 3],
      [4, 5, 4],
      [3, 0, 5],
    ],
    [
      [51, -5, 1],
      [5, 1, 0],
      [0, 0, 15],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 1, 0],
    ],
    [
      [1, 2, 3, 5],
      [2, 3, 4, 10],
      [3, 5, 10, -225],
      [4, 10, -55, 505],
    ],
    [
      [1, 0, 0],
      [2, 3, 0],
      [3, 4, 5],
    ],
  ];

  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const A = new Matrix(matrix);
      expect(A.isSymmetric()).toBe(false);
    });
  });
});
