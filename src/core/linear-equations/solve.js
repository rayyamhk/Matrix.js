const {
  INVALID_MATRIX,
  NO_UNIQUE_SOLUTION,
  INVALID_SQUARE_MATRIX,
  SIZE_INCOMPATIBLE,
} = require('../../Error');

/**
 * Solve system of linear equations Ax = y using LU decomposition.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n square Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Ax = y
 */
function solve(A, b) {
  if (!(A instanceof this) || !(b instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  const [aRow, aCol] = A.size();
  const [bRow, bCol] = b.size();

  if (aCol !== bRow || bCol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const EPSILON = 1 / ((10 ** A._digit) * 2);

  const [P, LU] = this.LU(A, true);
  const matrixLU = LU._matrix;
  const matrixB = b._matrix;

  for (let i = aRow - 1; i >= 0; i--) {
    if (Math.abs(matrixLU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  const clonedVector = new Array(bRow);
  const coefficients = new Array(bRow);

  for (let i = 0; i < bRow; i++) {
    // eslint-disable-next-line prefer-destructuring
    clonedVector[i] = matrixB[P[i]][0];
  }

  for (let i = 0; i < aRow; i++) {
    let summation = 0;
    for (let j = 0; j < i; j++) {
      summation += coefficients[j] * matrixLU[i][j];
    }
    coefficients[i] = clonedVector[i] - summation;
  }

  for (let i = aRow - 1; i >= 0; i--) {
    let summation = 0;
    for (let j = i + 1; j < aRow; j++) {
      summation += matrixLU[i][j] * clonedVector[j];
    }
    clonedVector[i] = (coefficients[i] - summation) / matrixLU[i][i];
  }

  for (let i = 0; i < bRow; i++) {
    coefficients[i] = [clonedVector[i]];
  }
  return new this(coefficients);
};

module.exports = solve;
