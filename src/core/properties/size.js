/**
 * Calculates the size of any Matrix,
 * which is in the form of [row, column].<br><br>
 * 
 * The size of Matrix is cached.
 * @memberof Matrix
 * @instance
 * @returns {number[]} The number of rows and columns of a Matrix
 */
function size() {
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

module.exports = size;
