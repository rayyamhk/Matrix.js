/**
 * Find the size of any matrix, which is in the form of [row, column].
 * The size is cached.
 * @return { Array } - The number of rows and columns of a matrix.
 */

module.exports = function size() {
  if (this._size !== undefined) {
    return this._size;
  }

  const A = this._matrix;

  if (A.length === 0) {
    this._size = [0, 0];
    return this._size;
  }

  this._size = [A.length, A[0].length];
  return this._size;
};
