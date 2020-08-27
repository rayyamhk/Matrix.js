// 1-norm, 2-norm, Inf-norm, F-norm
// Not cached

const Matrix = require('../..');
const { INVALID_P_NORM } = require('../../Error');

/**
 * Find the matrix norm of any matrix with respect to the choice of norm.
 * The norms are not cached.
 * @param { Number | String } p - The choice of matrix norm, it can be 1, 2, Infinity or 'F'
 * @return { Number } - Returns p-norm of the matrix.
 */

module.exports = function norm(p = 2) {
  const [row, col] = this.size();

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  const matrix = this._matrix;
  let result = 0;

  if (p === 1) {
    // max of column sum
    for (let j = 0; j < col; j++) {
      let columnSum = 0;
      for (let i = 0; i < row; i++) {
        columnSum += Math.abs(matrix[i][j]);
      }
      if (columnSum > result) {
        result = columnSum;
      }
    }
    return result;
  }

  // largest singular value
  if (p === 2) {
    const transpose = Matrix.transpose(this);
    const M = Matrix.multiply(transpose, this);
    const eigenvalues = M.eigenvalues();

    for (let i = 0; i < eigenvalues.length; i++) {
      const value = eigenvalues[i].getModulus();
      if (value > result) {
        result = value;
      }
    }
    return Math.sqrt(result);
  }

  if (p === Infinity) {
    // max of row sum
    for (let i = 0; i < row; i++) {
      let rowSum = 0;
      for (let j = 0; j < col; j++) {
        rowSum += Math.abs(matrix[i][j]);
      }
      if (rowSum > result) {
        result = rowSum;
      }
    }
    return result;
  }

  // F
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      result += matrix[i][j] ** 2;
    }
  }
  return Math.sqrt(result);
};
