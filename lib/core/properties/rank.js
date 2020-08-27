const Matrix = require('../..');

/**
 * Find the rank of any matrix.
 * The rank is cached.
 * @return { Number } - The rank of the matrix
 */

module.exports = function rank() {
  if (this._rank !== undefined) {
    return this._rank;
  }

  const EPSILON = 1 / ((10 ** this._digit) * 2);

  const R = Matrix.QR(this)[1];
  const matrixR = R._matrix;
  const [row, col] = R.size();

  if (row === 0) {
    this._rank = 1;
    return 1;
  }

  let rk = 0;
  for (let i = 0; i < row; i++) {
    for (let j = i; j < col; j++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        rk++;
        break;
      }
    }
  }

  this._rank = rk;
  return rk;
};
