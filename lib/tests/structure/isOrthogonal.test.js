/* eslint-disable max-len */
const Matrix = require('../../index');

describe('should be orthogonal matrix', () => {
  const { sin } = Math;
  const { cos } = Math;

  for (let iterator = 0; iterator < 10; iterator++) {
    it(`TEST ${iterator + 1}: 2x2 rotational matrix should be orthogonal`, () => {
      expect.hasAssertions();
      const theta = Math.random() * Math.PI * 2 - Math.PI;
      const rotational = [
        [cos(theta), sin(theta) * -1],
        [sin(theta), cos(theta)],
      ];
      const received = new Matrix(rotational).isOrthogonal();
      expect(received).toBe(true);
    });
  }

  for (let iterator = 0; iterator < 10; iterator++) {
    it(`TEST ${iterator + 1}: 3x3 rotational matrix should be orthogonal`, () => {
      expect.hasAssertions();
      const a = Math.random() * Math.PI * 2 - Math.PI;
      const b = Math.random() * Math.PI * 2 - Math.PI;
      const c = Math.random() * Math.PI * 2 - Math.PI;

      const rotational = [
        [cos(a) * cos(c) - sin(a) * sin(b) * sin(c), sin(a) * cos(b) * -1, cos(a) * sin(c) * -1 - sin(a) * sin(b) * cos(c)],
        [cos(a) * sin(b) * sin(c) + sin(a) * cos(c), cos(a) * cos(b), cos(a) * sin(b) * cos(c) - sin(a) * sin(c)],
        [cos(b) * sin(c), sin(b) * -1, cos(b) * cos(c)],
      ];
      const received = new Matrix(rotational).isOrthogonal();
      expect(received).toBe(true);
    });
  }

  const matrices = [
    [],
    [
      [1],
    ],
    [
      [1, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [0, -1],
    ],
    [
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
    ],
    [
      [1 / 3, 2 / 3, -2 / 3],
      [-2 / 3, 2 / 3, 1 / 3],
      [2 / 3, 1 / 3, 2 / 3],
    ],
  ];

  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be true`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isOrthogonal();
      expect(received).toBe(true);
    });
  });
});

describe('should not be orthogonal matrix', () => {
  const matrices = [
    [
      [1, 2],
      [3, 4],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ];

  matrices.forEach((matrix, idx) => {
    it(`test ${idx + 1}: should be false`, () => {
      expect.hasAssertions();
      const received = new Matrix(matrix).isOrthogonal();
      expect(received).toBe(false);
    });
  });
});
