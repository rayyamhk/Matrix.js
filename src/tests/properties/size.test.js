const Matrix = require('../../index');

describe('should get the size of matrix', () => {
  const tests = [
    {
      matrix: [],
      expected: [0, 0],
    },
    {
      matrix: [[0]],
      expected: [1, 1],
    },
    {
      matrix: [[0, 1, 2, 3]],
      expected: [1, 4],
    },
    {
      matrix: [[0], [1], [2], [3]],
      expected: [4, 1],
    },
    {
      matrix: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
      ],
      expected: [2, 4],
    },
    {
      matrix: [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
      ],
      expected: [4, 2],
    },
    {
      matrix: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      expected: [3, 3],
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST: ${idx + 1}: should get the size of matrix`, () => {
      expect.hasAssertions();
      const { matrix, expected } = test;
      const received = new Matrix(matrix).size();
      expect(received).toStrictEqual(expected);
    });
  });
});
