const Matrix = require('../..');

describe('should be skew symmetric matrix', () => {
  const matrices = [
    [
      [1, 2, 3, 4],
      [-2, 2, -4, 5],
      [-3, 4, 100, 10],
      [-4, -5, -10, 5],
    ],
    [
      [0, 2, -3],
      [-2, 3, -4],
      [3, 4, 5],
    ],
    [
      [1, 2],
      [-2, 0],
    ],
    [
      [1],
    ],
    [],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isSkewSymmetric();
      expect(received).toBe(true);
    });
  });
});

describe('should not be skew symmetric matrix', () => {
  const matrices = [
    [
      [1, -2, 3.123, -4 / 3],
      [-2, 2, -4, 5],
      [-3, 4, 100, 10],
      [-4, 12, -9 / 2, 5],
    ],
    [
      [0, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ],
    [
      [1, 2.123],
      [-2, 0],
    ],
    [
      [0, 1],
      [1, 0],
    ],
    [
      [-2, 2, -4, 5],
      [-3, 4, 100, 10],
      [-4, 12, -9 / 2, 5],
    ],
    [
      [0, 2],
      [2, 3],
      [3, 4],
    ],
    [[1], [-2], [3], [-4]],
    [
      [0, 1, 0],
      [1, 0, 1],
    ],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isSkewSymmetric();
      expect(received).toBe(false);
    });
  });
});
