/**
 * Determine whether a square matrix is symmetric or not.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Returns true if the square matrix is symmetric
 */

module.exports = function isSymmetric(digit = this._digit) {
  if (this._isSymmetric !== undefined) {
    return this._isSymmetric;
  }

  if (!this.isSquare()) {
    return false;
  }

  const A = this._matrix;
  const EPSILON = 1 / ((10 ** digit) * 2);
  const size = A.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= i; j++) {
      if (Math.abs(A[i][j] - A[j][i]) >= EPSILON) {
        this._isSymmetric = false;
        return false;
      }
    }
  }
  this._isSymmetric = true;
  return true;
};
