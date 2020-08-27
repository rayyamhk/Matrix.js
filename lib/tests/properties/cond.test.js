const Matrix = require('../..');

describe('should get correct condition number of matrix', () => {
  const tests = [
    {
      matrix: new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [1, 2, 7],
      ]),
      one: 64,
      two: 32.844126527227147,
      inf: 42.4999,
      F: 34.117851306578174,
    },
    {
      matrix: new Matrix([
        [7, 9, -5],
        [0, 5, -4],
        [1, 2, 6],
      ]),
      one: 7.2784,
      two: 4.8057,
      inf: 9.3059,
      F: 6.0206,
    },
    {
      matrix: new Matrix([
        [0, 0],
        [1, 0],
      ]),
      one: Infinity,
      two: Infinity,
      inf: Infinity,
      F: Infinity,
    },
  ];

  tests.forEach((test, idx) => {
    it(`TEST ${idx + 1}: should get correct condition number`, () => {
      expect.hasAssertions();
      const {
        matrix,
        one,
        two,
        inf,
        F,
      } = test;
      const receivedOne = matrix.cond(1);
      const receivedTwo = matrix.cond(2);
      const receivedInf = matrix.cond(Infinity);
      const receivedF = matrix.cond('F');
      expect(receivedOne).toBeCloseTo(one);
      expect(receivedTwo).toBeCloseTo(two);
      expect(receivedInf).toBeCloseTo(inf);
      expect(receivedF).toBeCloseTo(F);
    });
  });
});
