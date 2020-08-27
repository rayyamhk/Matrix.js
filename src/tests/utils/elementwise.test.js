const Matrix = require('../..');

describe('should perform correct operation', () => {
  const tests = [
    {
      description: 'TEST: elementwise addition',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => entry + 1,
      expected: [
        [2, 3],
        [4, 5],
      ],
    },
    {
      description: 'TEST: elementwise subtraction',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => entry - 10.5,
      expected: [
        [-9.5, -8.5],
        [-7.5, -6.5],
      ],
    },
    {
      description: 'TEST: elementwise multiplication',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => entry * 2,
      expected: [
        [2, 4],
        [6, 8],
      ],
    },
    {
      description: 'TEST: elementwise division',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => entry / 10,
      expected: [
        [0.1, 0.2],
        [0.3, 0.4],
      ],
    },
    {
      description: 'TEST: elementwise exponentiation',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => entry ** 2,
      expected: [
        [1, 4],
        [9, 16],
      ],
    },
    {
      description: 'TEST: elementwise sqrt',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => Math.sqrt(entry),
      expected: [
        [1, Math.sqrt(2)],
        [Math.sqrt(3), 2],
      ],
    },
    {
      description: 'TEST: elementwise complex operations',
      matrix: [
        [1, 2],
        [3, 4],
      ],
      cb: (entry) => (entry + 1) ** 2,
      expected: [
        [4, 9],
        [16, 25],
      ],
    },
    {
      description: 'TEST: elementwise operations on 0x0 matrix',
      matrix: [],
      cb: (entry) => (entry + 1) ** 2,
      expected: [],
    },
  ];

  tests.forEach((test, idx) => {
    it(`test ${idx + 1}: ${test.description}`, () => {
      expect.hasAssertions();
      const { matrix, cb, expected } = test;
      const A = new Matrix(matrix);
      const received = Matrix.elementwise(A, cb)._matrix;
      expect(received).toStrictEqual(expected);
    });
  });
});
