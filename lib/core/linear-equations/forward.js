const empty = require('../../util/empty');
const {
  INVALID_MATRIX,
  INVALID_LOWER_TRIANGULAR_MATRIX,
  INVALID_SQUARE_MATRIX,
  SIZE_INCOMPATIBLE,
  NO_UNIQUE_SOLUTION,
} = require('../../Error');

/**
 * Solve system of linear equations Lx = y,
 * where L is an lower triangular matrix.
 * If there's no unique solutions, an error is thrown.
 * @param { Matrix } L - n x n lower triangular matrix
 * @param { Matrix } y - n x 1 matrix
 * @return { Matrix } - Return n x 1 matrix which is the solution of Lx = y
 */

module.exports = function forward(L, y) {
  if (!(L instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!L.isLowerTriangular()) {
    throw new Error(INVALID_LOWER_TRIANGULAR_MATRIX);
  }

  if (!L.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  const size = L.size()[0];
  const [yrow, ycol] = y.size();
  const matrixL = L._matrix;
  const matrixY = y._matrix;

  if (size !== yrow || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const EPSILON = 1 / ((10 ** L._digit) * 2);

  for (let i = 0; i < size; i++) {
    if (Math.abs(matrixL[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  const coefficients = empty(size, 1);

  for (let i = 0; i < size; i++) {
    let summation = 0;
    for (let j = 0; j < i; j++) {
      summation += coefficients[j][0] * matrixL[i][j];
    }
    coefficients[i][0] = (matrixY[i][0] - summation) / matrixL[i][i];
  }

  return new this(coefficients);
};
