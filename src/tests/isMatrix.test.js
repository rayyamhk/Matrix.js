const isMatrix = require('../util/isMatrix');

describe('should be matrix', () => {
  const matrices = [
    [],
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [1, 2],
      [3, 4],
    ],
    [
      [1, 2, 3, 4],
    ],
    [
      [0],
    ],
    [
      [1],
      [2],
      [3],
      [4],
    ],
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
  ];

  matrices.forEach((matrix, index) => {
    it(`test ${index + 1}: should be true`, () => {
      expect.hasAssertions();
      expect(isMatrix(matrix)).toBe(true);
    });
  });
});

describe('should be non-matrix', () => {
  const nonMatrices = [
    [
      [],
    ],
    [
      [],
      [],
      [],
    ],
    [
      [],
      [1, 2, 3],
      [4],
      [5],
    ],
    [
      [1],
      [1, 2],
      [1, 2, 3],
    ],
    [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ],
    [
      [1, 2],
      [3, '4'],
    ],
    [1, 2, 3, 4, 5],
    'i am not an array',
    '',
    123,
    1.234,
    NaN,
    Infinity,
    null,
    undefined,
    () => {},
    {},
    {
      x: 'y',
    },
    JSON.stringify([
      [1, 2],
      [3, 4],
    ]),
    new Date(),
  ];

  nonMatrices.forEach((matrix, index) => {
    it(`TEST ${index + 1}: should be false`, () => {
      expect.hasAssertions();
      expect(isMatrix(matrix)).toBe(false);
    });
  });
});
