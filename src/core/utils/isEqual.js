const { INVALID_MATRIX } = require('../../Error');

/**
 * Determines whether two Matrices are considered as equal.<br><br>
 * 
 * The test criterion is Math.abs(x - y) < 1 / (10 ** digit * 2).
 * For default value 5, it should be 5e-5.
 * That means if the difference of two numbers is less than 5e-5,
 * they are considered as same value.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix
 * @param {number} digit - Number of significant digits
 * @returns {boolean} Returns true if two Matrices are considered as same
 */
function isEqual(A, B, digit = 5) {
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

module.exports = isEqual;
