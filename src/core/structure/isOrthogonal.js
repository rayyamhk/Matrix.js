/**
 * Determines whether a square Matrix is orthogonal or not.<br><br>
 * 
 * Orthogonal Matrix is a Matrix in which all rows and columns are
 * orthonormal vectors.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is orthogonal
 */
function isOrthogonal(digit = this._digit) {
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

module.exports = isOrthogonal;
