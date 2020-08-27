"use strict";

var _require = require('../../Error'),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Find the trace of any square matrix.
 * The trace is cached.
 * @return { Number } - Returns the trace of the square matrix.
 */


module.exports = function trace() {
  var isSquare = this._isSquare !== undefined ? this._isSquare : this.isSquare();

  if (!isSquare) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._trace !== undefined) {
    return this._trace;
  }

  var A = this._matrix;
  var size = A.length;
  var tr = 0;

  for (var i = 0; i < size; i++) {
    tr += A[i][i];
  }

  this._trace = tr;
  return tr;
};