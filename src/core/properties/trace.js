const { INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Calculates the trace of any square Matrix,
 * which is the sum of all entries on the main diagonal.<br><br>
 * 
 * The trace is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The trace of the square Matrix.
 */
function trace() {
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

module.exports = trace;
