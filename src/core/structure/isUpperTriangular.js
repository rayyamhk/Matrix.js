/**
 * Determine whether a matrix is upper triangular matrix or not.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Returns true if the matrix is upper triangular
 */

module.exports = function isUpperTriangular(digit = this._digit) {
  if (this._isUpperTriangular !== undefined) {
    return this._isUpperTriangular;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) { // []
    this._isUpperTriangular = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i <= j) {
        continue;
      }
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isUpperTriangular = false;
        return false;
      }
    }
  }
  this._isUpperTriangular = true;
  return true;
};
