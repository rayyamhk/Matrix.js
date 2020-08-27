const Matrix = require('../..');

describe('should get correct string', () => {
  const tests = [
    {
      matrix: new Matrix([]),
      str: '',
    },
    {
      matrix: new Matrix([
        [1],
      ]),
      str: '1',
    },
    {
      matrix: new Matrix([
        [1, 2],
      ]),
      str: '1 2',
    },
    {
      matrix: new Matrix([
        [1],
        [2],
      ]),
      str: '1\n2',
    },
    {
      matrix: new Matrix([
        [1, 2],
        [2, 3],
      ]),
      str: '1 2\n2 3',
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [2, 3, 4],
      ]),
      str: '1 2 3\n2 3 4',
    },
    {
      matrix: new Matrix([
        [1, 2],
        [2, 3],
        [3, 4],
      ]),
      str: '1 2\n2 3\n3 4',
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ]),
      str: '1 2 3\n2 3 4\n3 4 5',
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST ${idx + 1}: should get correct string`, () => {
      expect.hasAssertions();
      const { matrix, str } = test;
      const received = matrix.toString();
      expect(received).toBe(str);
    });
  });
});
