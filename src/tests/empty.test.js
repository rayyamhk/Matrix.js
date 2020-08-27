const empty = require('../util/empty');

describe('should create correct size of matrix', () => {
  it('should create 4x5 empty matrix', () => {
    expect.hasAssertions();
    const matrix = empty(4, 5);
    const expected = Array(4).fill(Array(5).fill(undefined));
    expect(matrix).toHaveLength(4);
    expect(matrix[0]).toHaveLength(5);
    expect(matrix).toStrictEqual(expected);
  });

  it('should create 1x1 empty matrix', () => {
    expect.hasAssertions();
    const matrix = empty(1, 1);
    const expected = Array(1).fill(Array(1).fill(undefined));
    expect(matrix).toHaveLength(1);
    expect(matrix[0]).toHaveLength(1);
    expect(matrix).toStrictEqual(expected);
  });

  it('should create 1x10 empty matrix', () => {
    expect.hasAssertions();
    const matrix = empty(1, 10);
    const expected = Array(1).fill(Array(10).fill(undefined));
    expect(matrix).toHaveLength(1);
    expect(matrix[0]).toHaveLength(10);
    expect(matrix).toStrictEqual(expected);
  });

  it('should create 10x1 empty matrix', () => {
    expect.hasAssertions();
    const matrix = empty(10, 1);
    const expected = Array(10).fill(Array(1).fill(undefined));
    expect(matrix).toHaveLength(10);
    expect(matrix[0]).toHaveLength(1);
    expect(matrix).toStrictEqual(expected);
  });

  it('should create 0x0 empty matrix 1', () => {
    expect.hasAssertions();
    const matrix = empty(0, 0);
    expect(matrix).toStrictEqual([]);
  });

  it('should create 0x0 empty matrix 2', () => {
    expect.hasAssertions();
    const matrix = empty(0, 10);
    expect(matrix).toStrictEqual([]);
  });

  it('should create 0x0 empty matrix 3', () => {
    expect.hasAssertions();
    const matrix = empty(10, 0);
    expect(matrix).toStrictEqual([]);
  });

  it('should throw error', () => {
    expect.hasAssertions();
    expect(() => empty(1.1, 2.2)).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty(1, 1.1)).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty(1.1, 2)).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty(-1, -2)).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty(Infinity, NaN)).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty('1', '2')).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty('abc', 'def')).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty()).toThrow('Invalid argument: Expected non-negative integer row and column');
    expect(() => empty(1)).toThrow('Invalid argument: Expected non-negative integer row and column');
  });
});
