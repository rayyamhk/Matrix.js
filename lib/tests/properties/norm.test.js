const Matrix = require('../..');
const { INVALID_P_NORM } = require('../../Error');

// TODO: ADD 2-norm tests
describe('should get the matrix 1, 2, Inf and F norm', () => {
  const tests = [
    {
      matrix: new Matrix([
        [1, 2, 5],
        [-2, -3, 7],
        [6, 5, 1],
      ]),
      one: 13,
      two: 9.0959,
      inf: 12,
      F: 12.4097,
    },
    {
      matrix: new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [9, 8, 7],
      ]),
      one: 16,
      two: 16.7040,
      inf: 24,
      F: 16.8819,
    },
    {
      matrix: new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
      one: 1,
      two: 1,
      inf: 1,
      F: 1.7321,
    },
    {
      matrix: new Matrix([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
      one: 0,
      two: 0,
      inf: 0,
      F: 0,
    },
    {
      matrix: new Matrix([
        [1, 7, -5],
        [-8, 0, 2],
        [3, 4, 9],
      ]),
      one: 16,
      two: 10.5550,
      inf: 16,
      F: 15.7797,
    },
    {
      matrix: new Matrix([
        [1, 7, -5, 2, -7],
        [-8, 0, 2, 9, 4],
        [3, 4, 9, 6, 5],
      ]),
      one: 17,
      two: 15.8499,
      inf: 27,
      F: 21.4476,
    },
    {
      matrix: new Matrix([
        [1, 7, -5],
        [-8, 0, 2],
        [3, 4, 9],
        [-1, 2, 3],
        [9, 0, -5],
        [7, 2, -3],
      ]),
      one: 29,
      two: 15.8359,
      inf: 16,
      F: 20.7605,
    },
  ];

  tests.forEach((test, idx) => {
    it(`test ${idx + 1}: should get matrix norm`, () => {
      expect.hasAssertions();
      const {
        matrix,
        one,
        two,
        inf,
        F,
      } = test;
      const receivedOne = matrix.norm(1);
      const receivedTwo = matrix.norm(2);
      const receivedInf = matrix.norm(Infinity);
      const receivedF = matrix.norm('F');
      expect(receivedOne).toBeCloseTo(one);
      expect(receivedTwo).toBeCloseTo(two);
      expect(receivedInf).toBeCloseTo(inf);
      expect(receivedF).toBeCloseTo(F);
    });
  });
});

describe('should throw error', () => {
  it('test', () => {
    expect.hasAssertions();
    const matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(() => matrix.norm(1.23)).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm(0)).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm(-1.23)).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm(-5)).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm('1.234')).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm('1')).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm('-10.5')).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm(-Infinity)).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm(() => {})).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm({})).toThrow(INVALID_P_NORM);
    expect(() => matrix.norm([])).toThrow(INVALID_P_NORM);
  });
});
