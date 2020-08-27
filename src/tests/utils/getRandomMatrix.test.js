const Matrix = require('../../index');
const { INVALID_ROW_COL } = require('../../Error');

describe('should generate random matrix', () => {
  it('test: generate 0x0 matrix', () => {
    expect.hasAssertions();
    const matrix = Matrix.getRandomMatrix(0, 0, -10, 10, 2);
    const expected = new Matrix([]);
    expect(matrix).toStrictEqual(expected);
  });
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 5; col++) {
      for (let fixed = 0; fixed < 5; fixed++) {
        it(`test: row - ${row}; col - ${col}; toFixed - ${fixed}`, () => {
          expect.hasAssertions();
          const A = Matrix.getRandomMatrix(row, col, -10, 10, fixed);
          const [r, c] = A.size();
          expect(r).toBe(row);
          expect(c).toBe(col);
          for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
              const decimals = A.entry(i, j).toString().split('.')[1];
              expect(A.entry(i, j)).toBeGreaterThanOrEqual(-10);
              expect(A.entry(i, j)).toBeLessThanOrEqual(10);
              expect((decimals && decimals.length) || 0).toBeLessThanOrEqual(fixed);
            }
          }
        });
      }
    }
  }
});

describe('should throw error', () => {
  it('test 1: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix(-1, 5)).toThrow(INVALID_ROW_COL);
  });
  it('test 2: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix(0.12345, 2)).toThrow(INVALID_ROW_COL);
  });
  it('test 3: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix(Infinity, NaN)).toThrow(INVALID_ROW_COL);
  });
  it('test 4: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix(NaN, -1)).toThrow(INVALID_ROW_COL);
  });
  it('test 5: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix('abcde', '')).toThrow(INVALID_ROW_COL);
  });
  it('test 6: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix('', 'abc')).toThrow(INVALID_ROW_COL);
  });
  it('test 7: should throw error', () => {
    expect.hasAssertions();
    expect(() => Matrix.getRandomMatrix('3')).toThrow(INVALID_ROW_COL);
  });
});
