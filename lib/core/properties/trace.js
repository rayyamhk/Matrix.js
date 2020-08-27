const { INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Find the trace of any square matrix.
 * The trace is cached.
 * @return { Number } - Returns the trace of the square matrix.
 */

module.exports = function trace() {
  const isSquare = this._isSquare !== undefined ? this._isSquare : this.isSquare();
  if (!isSquare) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._trace !== undefined) {
    return this._trace;
  }

  const A = this._matrix;
  const size = A.length;

  let tr = 0;
  for (let i = 0; i < size; i++) {
    tr += A[i][i];
  }
  this._trace = tr;
  return tr;
};
