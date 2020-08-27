const Matrix = require('../..');

describe('should get correct rank-nullity pair', () => {
  const tests = [
    {
      matrix: new Matrix([]),
      rank: 1,
      nullity: -1,
    },
    {
      matrix: new Matrix([[0]]),
      rank: 0,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [1, 2],
        [3, 4],
      ]),
      rank: 2,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [1, 0],
        [0, 1],
      ]),
      rank: 2,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [0, 0],
        [0, 0],
      ]),
      rank: 0,
      nullity: 2,
    },
    {
      matrix: new Matrix([
        [1, 7],
        [2, 14],
      ]),
      rank: 1,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [1, 2, 4, 4],
        [3, 4, 8, 0],
      ]),
      rank: 2,
      nullity: 2,
    },
    {
      matrix: new Matrix([
        [0, 1, 2],
        [1, 2, 1],
        [2, 7, 8],
      ]),
      rank: 2,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [1, 0, 2],
        [2, 1, 0],
        [3, 2, 1],
      ]),
      rank: 3,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [1, 5, 1],
        [2, 1, 1],
        [3, 6, 2],
      ]),
      rank: 2,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [2, -1, 0, 7],
        [1, 0, 1, 3],
        [3, 2, 7, 7],
      ]),
      rank: 2,
      nullity: 2,
    },
    {
      matrix: new Matrix([
        [2, 3, 1, 6],
        [-1, -2, 0, -3],
        [3, 5, 1, 9],
      ]),
      rank: 2,
      nullity: 2,
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [2, 3, 5],
        [3, 4, 7],
        [4, 5, 9],
      ]),
      rank: 2,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [4, -6, 0],
        [-6, 0, 1],
        [0, 9, -1],
        [0, 1, 4],
      ]),
      rank: 3,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [0, 16, 8, 4],
        [2, 4, 8, 16],
        [16, 8, 4, 2],
        [4, 8, 16, 2],
      ]),
      rank: 4,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [1, -4, 2, -1],
        [3, -12, 6, -3],
        [2, -1, 0, 1],
        [0, 1, 3, -1],
      ]),
      rank: 3,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [3, 0, 1, 2],
        [6, 1, 0, 0],
        [12, 1, 2, 4],
        [6, 0, 2, 4],
        [9, 0, 1, 2],
      ]),
      rank: 3,
      nullity: 1,
    },
    {
      matrix: new Matrix([
        [3, 2, 4, 1],
        [1, 1, 0, 2],
        [1, -1, 1, 3],
        [-1, 2, 4, 2],
        [0, 1, -1, 3],
      ]),
      rank: 4,
      nullity: 0,
    },
    {
      matrix: new Matrix([
        [2, 1, 3, 2],
        [3, 2, 5, 1],
        [-1, 1, 0, -7],
        [3, -2, 1, 17],
        [0, 1, 1, -4],
      ]),
      rank: 2,
      nullity: 2,
    },
    {
      matrix: new Matrix([
        [1, 2, -1, 3, -2],
        [2, 1, 0, 1, 1],
        [2, 4, -2, 6, -4],
        [0, 0, 0, 0, 0],
        [5, 4, -1, 5, 0],
      ]),
      rank: 2,
      nullity: 3,
    },
    {
      matrix: new Matrix([
        [1, 1, 0, 3, -1],
        [1, 2, 0, 3, 0],
        [1, 3, 0, 3, 1],
        [1, 4, 0, 3, 2],
        [1, 5, 0, 3, 3],
        [1, 6, 0, 3, 4],
      ]),
      rank: 2,
      nullity: 3,
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST ${idx + 1}: should get correct rank-nullity pair of matrix`, () => {
      expect.hasAssertions();
      const { matrix, rank, nullity } = test;
      const receivedRank = matrix.rank();
      const receivedNullity = matrix.nullity();
      expect(receivedRank).toBe(rank);
      expect(receivedNullity).toBe(nullity);
    });
  });
});
