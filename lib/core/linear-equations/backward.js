const empty = require('../../util/empty');
const {
  INVALID_MATRIX,
  INVALID_UPPER_TRIANGULAR_MATRIX,
  INVALID_SQUARE_MATRIX,
  SIZE_INCOMPATIBLE,
  NO_UNIQUE_SOLUTION,
} = require('../../Error');

/**
 * Solve system of linear equations Ux = y,
 * where U is an upper triangular matrix.
 * If there is no unique solutions, an error is thrown.
 * @param { Matrix } U - n x n upper triangular matrix
 * @param { Matrix } y - n x 1 matrix
 * @return { Matrix } - Returns n x 1 matrix which is the solution of Ux = y
 */

module.exports = function backward(U, y) {
  if (!(U instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!U.isUpperTriangular()) {
    throw new Error(INVALID_UPPER_TRIANGULAR_MATRIX);
  }

  if (!U.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  const size = U.size()[0];
  const [yrow, ycol] = y.size();
  const matrixU = U._matrix;
  const matrixY = y._matrix;

  if (yrow !== size || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const EPSILON = 1 / ((10 ** U._digit) * 2);

  for (let i = 0; i < size; i++) {
    if (Math.abs(matrixU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  const coefficients = empty(size, 1);

  for (let i = size - 1; i >= 0; i--) {
    let summation = 0;
    for (let j = i + 1; j < size; j++) {
      summation += coefficients[j][0] * matrixU[i][j];
    }
    coefficients[i][0] = (matrixY[i][0] - summation) / matrixU[i][i];
  }

  return new this(coefficients);
};
