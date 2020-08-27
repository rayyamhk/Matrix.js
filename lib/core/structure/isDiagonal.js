/**
 * Determine whether a matrix is diagonal matrix or not.
 * Note that the diagonality is not limited to square matrix.
 * The result is cached.
 * @param { Number } digit - Number of significant digits
 * @return { Boolean } - Return true if the matrix is diagonal matrix
 */

module.exports = function isDiagonal(digit = this._digit) {
  if (this._isDiagonal !== undefined) {
    return this._isDiagonal;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) {
    this._isDiagonal = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
        this.isDiagonal = false;
        return false;
      }
    }
  }
  this._isDiagonal = true;
  return true;
};
