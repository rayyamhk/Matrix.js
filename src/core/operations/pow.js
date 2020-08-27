const { INVALID_MATRIX, INVALID_SQUARE_MATRIX, INVALID_EXPONENT } = require('../../Error');

/**
 * Find the power of any square matrix.
 * @param { Matrix } A - Any square matrix
 * @param { Number } exponent - Any Non-negative integer
 * @return { Matrix } - Returns the power of A
 */

module.exports = function pow(A, exponent) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new Error(INVALID_EXPONENT);
  }

  const size = A.size()[0];

  if (exponent === 0) {
    return this.identity(size);
  }
  if (exponent === 1) {
    return this.clone(A);
  }
  if (exponent % 2 === 0) {
    const temp = this.pow(A, exponent / 2);
    return this.multiply(temp, temp);
  }
  const temp = this.pow(A, (exponent - 1) / 2);
  return this.multiply(this.multiply(temp, temp), A);
};
