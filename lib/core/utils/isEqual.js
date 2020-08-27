const { INVALID_MATRIX } = require('../../Error');

/**
 * Determine whether two matrices are considered as equal.
 * @param { Matirx } A - Matrix
 * @param { Matirx } B - Matrix
 * @param { Integer } digit - Number of significant digits
 * @return { Boolean } - Return true if two matrices are considered as same
 */

module.exports = function isEqual(A, B, digit = 5) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [Arow, Acol] = A.size();
  const [Brow, Bcol] = B.size();

  if (Arow !== Brow || Acol !== Bcol) {
    return false;
  }

  const EPISILON = 1 / ((10 ** digit) * 2);
  const matrixA = A._matrix;
  const matrixB = B._matrix;

  for (let i = 0; i < Arow; i++) {
    for (let j = 0; j < Acol; j++) {
      if (Math.abs(matrixA[i][j] - matrixB[i][j]) >= EPISILON) {
        return false;
      }
    }
  }
  return true;
};
