const Matrix = require('../..');

describe('should be diagonal matrix', () => {
  const matrices = [
    [
      [1, 0, 0],
      [0, 5, 0],
      [0, 0, -3],
    ],
    [
      [1, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [0, 0],
    ],
    [],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isDiagonal();
      expect(received).toBe(true);
    });
  });
});

describe('should be non-diagonal matrix', () => {
  const matrices = [
    [
      [1, 0, 1],
      [0, 5, 0],
      [0, 0, -3],
    ],
    [
      [1, 0],
      [0.001, 1],
    ],
    [
      [0, 1],
      [0, 0],
    ],
  ];
  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isDiagonal();
      expect(received).toBe(false);
    });
  });
});
