/* eslint-disable prefer-destructuring */
const Matrix = require('../..');
const { INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Find the determinant of square matrirx.
 * The determinant is cached.
 * @return { Number } - Returns the determinant of square matrirx
 */

module.exports = function det() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._det !== undefined) {
    return this._det;
  }

  const matrix = this._matrix;
  const size = matrix.length;

  if (size === 0) {
    this._det = 1;
    return 1; // the determinant of 0x0 matrix must be 1
  }

  if (size === 1) {
    this._det = matrix[0][0];
    return this._det;
  }

  if (size === 2) {
    this._det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return this._det;
  }

  if (size === 3) {
    this._det = matrix[0][0] * matrix[1][1] * matrix[2][2]
    + matrix[0][1] * matrix[1][2] * matrix[2][0]
    + matrix[0][2] * matrix[1][0] * matrix[2][1]
    - matrix[0][2] * matrix[1][1] * matrix[2][0]
    - matrix[0][1] * matrix[1][0] * matrix[2][2]
    - matrix[0][0] * matrix[1][2] * matrix[2][1];
    return this._det;
  }

  const [P, LU] = Matrix.LU(this, true);
  const matrixLU = LU._matrix;

  // count whether the number of permutations <swap> is odd or even
  // O(n^2)
  let swap = 0;
  for (let i = 0; i < size; i++) {
    if (P[i] === i) {
      continue;
    }
    while (P[i] !== i) {
      const target = P[i];
      P[i] = P[target];
      P[target] = target;
      swap++;
    }
  }

  let result = 1;
  for (let i = 0; i < size; i++) {
    result *= matrixLU[i][i];
  }

  if (swap % 2 === 1) {
    this._det = result * -1;
    return this._det;
  }
  this._det = result;
  return result;
};
