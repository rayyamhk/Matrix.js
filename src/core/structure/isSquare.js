/**
 * Determine whether a matrix is square or not
 * The result is cached.
 * @return { Boolean } - Returns true if the matrix is square
 */

module.exports = function isSquare() {
  if (this._isSquare !== undefined) {
    return this._isSquare;
  }

  const A = this._matrix;
  if (A.length === 0) { // 0x0 matrix
    this._isSquare = true;
    return true;
  }

  this._isSquare = A.length === A[0].length;
  return this._isSquare;
};
