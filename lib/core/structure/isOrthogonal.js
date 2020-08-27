/**
 * Determine whether a square matrix is orthogonal or not.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Returns true if the square matrix is orthogonal
 */

module.exports = function isOrthogonal(digit = this._digit) {
  if (this._isOrthogonal !== undefined) {
    return this._isOrthogonal;
  }

  if (!this.isSquare()) {
    this._isOrthogonal = false;
    return false;
  }

  const A = this._matrix;
  const EPSILON = 1 / ((10 ** digit) * 2);
  const size = A.length;

  for (let i = 0; i < size; i++) {
    for (let j = i; j < size; j++) {
      let entry = 0;
      for (let k = 0; k < size; k++) {
        entry += A[i][k] * A[j][k];
      }
      if (i === j && Math.abs(entry - 1) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }
      if (i !== j && Math.abs(entry) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }
    }
  }
  this._isOrthogonal = true;
  return true;
};
