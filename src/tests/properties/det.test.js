const Matrix = require('../..');
const { INVALID_SQUARE_MATRIX } = require('../../Error');

describe('should get determinant of matrix', () => {
  const tests = [
    {
      matrix: new Matrix([]),
      det: 1,
    },
    {
      matrix: new Matrix([[10248]]),
      det: 10248,
    },
    {
      matrix: new Matrix([
        [1, 2],
        [3, 4],
      ]),
      det: -2,
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [3, 4, 5],
        [4, 5, 6],
      ]),
      det: 0,
    },
    {
      matrix: new Matrix([
        [5, 2, 3],
        [3, -2, 5],
        [7, 5, -4],
      ]),
      det: 96,
    },
    {
      matrix: new Matrix([
        [-4, 1, 9],
        [3, -25, 16],
        [2, 7, -1],
      ]),
      det: 1022,
    },
    {
      matrix: new Matrix([
        [0, 0, 0],
        [3, -25, 16],
        [2, 7, -1],
      ]),
      det: 0,
    },
    {
      matrix: new Matrix([
        [0, 20, 30],
        [0, -25, 16],
        [0, 7, -1],
      ]),
      det: 0,
    },
    {
      matrix: new Matrix([
        [1, 20, 30],
        [0, -25, 16],
        [0, 0, -4],
      ]),
      det: 100,
    },
    {
      matrix: new Matrix([
        [5, 0, 0],
        [0, 6, 0],
        [0, 0, 7],
      ]),
      det: 210,
    },
    {
      matrix: new Matrix([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
      det: 0,
    },
    {
      matrix: new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
      det: 1,
    },
    {
      matrix: new Matrix([
        [1, 20, 30, -8],
        [2, -25, 16, 4],
        [12, 5, -16, 3],
        [10, 6, -4, 2],
      ]),
      det: 14944,
    },
    {
      matrix: new Matrix([
        [1, 3, 5, 9],
        [1, 3, 1, 7],
        [4, 3, 9, 7],
        [5, 2, 0, 9],
      ]),
      det: -376,
    },
    {
      matrix: new Matrix([
        [5, 0, 0, 0],
        [0, 6, 0, 0],
        [0, 0, 7, 0],
        [0, 0, 0, 2],
      ]),
      det: 420,
    },
    {
      matrix: new Matrix([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]),
      det: 0,
    },
    {
      matrix: new Matrix([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]),
      det: 1,
    },
    {
      matrix: new Matrix([
        [1, 22, 3, -14, 5, 16, 7, 8, 9, 10],
        [-10, -9, 8, 17, -6, 5, -4, -3, -2, -1],
        [5, 6, 7, 8, 9, 10, 1, 12, 3, 14],
        [4, 5, 6, 7, 8, 9, 10, 1, 12, 13],
        [0, 1, 2, 3, -4, 5, 6, 7, -8, 9],
        [8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
        [-5, 4, 23, 2, 1, 0, -1, -2, -3, -4],
        [2, 2, 2, -12, 12, 2, -2, 2, -2, 2],
        [1, 3, 2, 3, 3, -3, 13, 9, 6, 3],
        [-1, -1, 1, 10, 4, -5, 8, -1, 1, -1],
      ]),
      det: 296473177600,
    },
    {
      matrix: new Matrix([
        [1, 2, 5, -7, 2.58, 63.14, 7.12, 0],
        [5.87, 5.1, -7.1, -2.257, 3.12, 6.7, 5.8, 1.26],
        [6, -12.277, 6, 5, 4, 3, 123, 2],
        [0, 2.5, -55, -7, 3, 6, 0, 9],
        [12, 3, 8, -7, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, -10, -9],
        [-8, -7, -6, -5, -4, -3, -2, -1],
        [0, 1, 2, 3, 4, 5, 6, 6],
      ]),
      det: 6962835906.67361,
    },
    {
      matrix: new Matrix([
        [0.29246, 5.3174, 6.7088, 4.64535, 5.88035, 7.97275],
        [0.80326, 1.9267, 0.73281, 6.88944, 3.18246, 0.69463],
        [7.3019, 4.90075, 8.73379, 8.30255, 0.5465, 5.07834],
        [0.15749, 2.06313, 5.05617, 8.33536, 3.17301, 6.27412],
        [2.49146, 0.30795, 5.59884, 4.56593, 0.46511, 8.15225],
        [5.69306, 0.76304, 6.57813, 0.67678, 0.78807, 1.10368],
      ]),
      det: 20725.21309,
    },
    {
      matrix: new Matrix([
        [4.75214, 0.1054, 0.09468, 1.60975, 5.86515, 6.67398, 3.0994],
        [4.40529, 7.09086, 7.2189, 0.7206, 6.24806, 7.9115, 6.07632],
        [2.0839, 2.59177, 8.78776, 6.26316, 2.52018, 2.42276, 7.97056],
        [6.72829, 1.68131, 8.98605, 2.67852, 3.08398, 6.01805, 0.88992],
        [1.78863, 4.0158, 5.73638, 6.02038, 6.07036, 0.26099, 8.33121],
        [2.32659, 2.36767, 8.15126, 1.24256, 2.60803, 3.74441, 6.02881],
        [0.23376, 6.41995, 1.84979, 3.43746, 7.94785, 6.01222, 7.0014],
      ]),
      det: 131223.64162,
    },
    {
      matrix: new Matrix([[1, 2, 3]]),
      hasError: true,
      det: INVALID_SQUARE_MATRIX,
    },
    {
      matrix: new Matrix([[1], [2], [3]]),
      hasError: true,
      det: INVALID_SQUARE_MATRIX,
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [3, 4, 5],
      ]),
      hasError: true,
      det: INVALID_SQUARE_MATRIX,
    },
    {
      matrix: new Matrix([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
      hasError: true,
      det: INVALID_SQUARE_MATRIX,
    },
  ];

  tests.forEach((test, idx) => {
    if (test.hasError) {
      it(`test ${idx + 1}: should throw error`, () => {
        expect.hasAssertions();
        const { matrix, det } = test;
        expect(() => matrix.det()).toThrow(det);
      });
    } else {
      it(`test ${idx + 1}: should get correct determiant of matrix`, () => {
        expect.hasAssertions();
        const { matrix, det } = test;
        const received = matrix.det();
        expect(received).toBeCloseTo(det);
      });
    }
  });
});
