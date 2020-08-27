const Matrix = require('../../index');
const { INVALID_ROW_COL } = require('../../Error');

describe('should generate correct matrix', () => {
  const tests = [
    {
      describe: 'should generate 3x3 identity matrix',
      row: 3,
      col: 3,
      cb: (i, j) => {
        if (i === j) {
          return 1;
        }
        return 0;
      },
      expected: new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
    },
    {
      describe: 'should generate 3x3 zero matrix',
      row: 3,
      col: 3,
      cb: () => 0,
      expected: new Matrix([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
    },
    {
      describe: 'should generate upper-triangular matrix',
      row: 3,
      col: 3,
      cb: (i, j) => {
        if (i <= j) {
          return 1;
        }
        return 0;
      },
      expected: new Matrix([
        [1, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ]),
    },
    {
      describe: 'should generate lower-triangular matrix',
      row: 3,
      col: 3,
      cb: (i, j) => {
        if (i >= j) {
          return 1;
        }
        return 0;
      },
      expected: new Matrix([
        [1, 0, 0],
        [1, 1, 0],
        [1, 1, 1],
      ]),
    },
    {
      describe: 'should generate 3x5 diagonal matrix',
      row: 3,
      col: 5,
      cb: (i, j) => {
        if (i === j) {
          return 1;
        }
        return 0;
      },
      expected: new Matrix([
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ]),
    },
    {
      describe: 'should generate 3x3 Hilbert matrix',
      row: 3,
      col: 3,
      cb: (i, j) => 1 / (i + j + 1),
      expected: new Matrix([
        [1, 1 / 2, 1 / 3],
        [1 / 2, 1 / 3, 1 / 4],
        [1 / 3, 1 / 4, 1 / 5],
      ]),
    },
    {
      describe: 'should generate 0x0 matrix 1',
      row: 0,
      col: 0,
      cb: () => {},
      expected: new Matrix([]),
    },
    {
      describe: 'should generate 0x0 matrix 2',
      row: 0,
      col: 10,
      cb: () => {},
      expected: new Matrix([]),
    },
    {
      describe: 'should generate 0x0 matrix 3',
      row: 10,
      col: 0,
      cb: () => {},
      expected: new Matrix([]),
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST: ${idx + 1}: ${test.describe}`, () => {
      expect.hasAssertions();
      const {
        row,
        col,
        cb,
        expected,
      } = test;
      const received = Matrix.generate(row, col, cb);
      expect(received).toStrictEqual(expected);
    });
  });

  it('should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.generate(0, -1.1, () => {})).toThrow(INVALID_ROW_COL);
  });
});
