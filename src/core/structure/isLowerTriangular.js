/**
 * Determine whether a matrix is lower triangular matrix or not.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Returns true if the matrix is lower triangular
 */

module.exports = function isLowerTriangular(digit = this._digit) {
  if (this._isLowerTriangular !== undefined) {
    return this._isLowerTriangular;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) { // []
    this._isLowerTriangular = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = i + 1; j < col; j++) {
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isLowerTriangular = false;
        return false;
      }
    }
  }
  this._isLowerTriangular = true;
  return true;
};
