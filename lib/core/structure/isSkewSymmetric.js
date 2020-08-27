/**
 * Determine whether a square matrix is skew symmetric or not.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Return true if the square matrix is skew symmetric
 */

module.exports = function isSkewSymmetric(digit = this._digit) {
  if (this._isSkewSymmetric !== undefined) {
    return this._isSkewSymmetric;
  }

  if (!this.isSquare()) {
    this._isSkewSymmetric = false;
    return false;
  }

  const A = this._matrix;
  const EPSILON = 1 / ((10 ** digit) * 2);
  const size = A.length;

  if (size === 0) {
    this._isSkewSymmetric = true;
    return true; // []
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < i; j++) {
      if (Math.abs(A[i][j] + A[j][i]) >= EPSILON) {
        this._isSkewSymmetric = false;
        return false;
      }
    }
  }
  this._isSkewSymmetric = true;
  return true;
};
