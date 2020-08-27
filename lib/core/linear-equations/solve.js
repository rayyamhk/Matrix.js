const {
  INVALID_MATRIX,
  NO_UNIQUE_SOLUTION,
  INVALID_SQUARE_MATRIX,
  SIZE_INCOMPATIBLE,
} = require('../../Error');

/**
 * Solve system of linear equations Ax = y with LU decomposition,
 * If there's no unique solutions, an error is thrown.
 * @param { Matrix } A - Any n x n square matrix
 * @param { Matrix } y - n x 1 matrix
 * @return { Matrix } - Return n x 1 matrix which is the solution of Ax = y
 */

module.exports = function solve(A, b) {
  if (!(A instanceof this) || !(b instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  const [arow, acol] = A.size();
  const [brow, bcol] = b.size();

  if (acol !== brow || bcol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const EPSILON = 1 / ((10 ** A._digit) * 2);

  const [P, LU] = this.LU(A, true);
  const matrixLU = LU._matrix;
  const matrixB = b._matrix;

  for (let i = arow - 1; i >= 0; i--) {
    if (Math.abs(matrixLU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  const clonedVector = new Array(brow);
  const coefficients = new Array(brow);

  for (let i = 0; i < brow; i++) {
    // eslint-disable-next-line prefer-destructuring
    clonedVector[i] = matrixB[P[i]][0];
  }

  for (let i = 0; i < arow; i++) {
    let summation = 0;
    for (let j = 0; j < i; j++) {
      summation += coefficients[j] * matrixLU[i][j];
    }
    coefficients[i] = clonedVector[i] - summation;
  }

  for (let i = arow - 1; i >= 0; i--) {
    let summation = 0;
    for (let j = i + 1; j < arow; j++) {
      summation += matrixLU[i][j] * clonedVector[j];
    }
    clonedVector[i] = (coefficients[i] - summation) / matrixLU[i][i];
  }

  for (let i = 0; i < brow; i++) {
    coefficients[i] = [clonedVector[i]];
  }
  return new this(coefficients);
};
