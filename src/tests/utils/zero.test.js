const Matrix = require('../..');

describe('should get zero matrix', () => {
  it('should get 1x1', () => {
    expect.hasAssertions();
    const expected = [
      [0],
    ];
    const received = Matrix.zero(1)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 2x2', () => {
    expect.hasAssertions();
    const expected = Array(2).fill(Array(2).fill(0));
    const received = Matrix.zero(2)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 3x3', () => {
    expect.hasAssertions();
    const expected = Array(3).fill(Array(3).fill(0));
    const received = Matrix.zero(3)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 1x10', () => {
    expect.hasAssertions();
    const expected = Array(1).fill(Array(10).fill(0));
    const received = Matrix.zero(1, 10)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 10x1', () => {
    expect.hasAssertions();
    const expected = Array(10).fill(Array(1).fill(0));
    const received = Matrix.zero(10, 1)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 5x7', () => {
    expect.hasAssertions();
    const expected = Array(5).fill(Array(7).fill(0));
    const received = Matrix.zero(5, 7)._matrix;
    expect(received).toStrictEqual(expected);
  });

  it('should get 0x0 1', () => {
    expect.hasAssertions();
    expect(Matrix.zero(0)._matrix).toStrictEqual([]);
  });

  it('should get 0x0 2', () => {
    expect.hasAssertions();
    expect(Matrix.zero(0, 2)._matrix).toStrictEqual([]);
  });

  it('should get 0x0 3', () => {
    expect.hasAssertions();
    expect(Matrix.zero(2, 0)._matrix).toStrictEqual([]);
  });
});
