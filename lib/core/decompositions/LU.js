/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

const { INVALID_MATRIX } = require('../../Error');

/**
 * Find the LUP decomposition of a given matrix,
 * where L is lower triangular matrix, U is upper triangular matrix,
 * and P is permutation matrix.
 * @param { Matrix } A - Any matrix
 * @param { Boolean } optimized - Control the returned value of LU decomposition
 * @return { Array } - Return the LU decomposition of matrix. If optimized is true, returns [P, LU]
 * otherwise returns [P, L, U].
 */

module.exports = function LU(A, optimized = false) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const size = Math.min(row, col);
  const EPSILON = 1 / ((10 ** A._digit) * 2);

  const permutation = initPermutation(row);
  const copy = this.clone(A)._matrix;

  for (let i = 0; i < row - 1; i++) {
    const currentCol = Math.min(i, col);

    // apply Partial Pivoting
    PartialPivoting(copy, permutation, currentCol, row, col);

    const ith = permutation[i];
    const pivot = copy[ith][currentCol];

    if (Math.abs(pivot) < EPSILON) {
      continue;
    }

    for (let j = i + 1; j < row; j++) {
      const jth = permutation[j];
      const entry = copy[jth][currentCol];

      if (Math.abs(entry) >= EPSILON) {
        const factor = entry / pivot;

        for (let k = currentCol; k < col; k++) {
          copy[jth][k] -= factor * copy[ith][k];
        }

        copy[jth][currentCol] = factor;
      }
    }
  }

  const result = new Array(row);
  for (let i = 0; i < row; i++) {
    result[i] = copy[permutation[i]];
  }

  if (optimized) {
    return [permutation, new this(result)];
  }

  const P = this.generate(row, row, (i, j) => {
    const idx = permutation[i];
    if (j === idx) {
      return 1;
    }
    return 0;
  });
  const L = this.generate(row, size, (i, j) => {
    if (i === j) {
      return 1;
    }
    if (i < j) {
      return 0;
    }
    return result[i][j];
  });
  const U = this.generate(size, col, (i, j) => {
    if (i > j) {
      return 0;
    }
    return result[i][j];
  });

  return [P, L, U];
};

function initPermutation(size) {
  const permutation = new Array(size);
  for (let i = 0; i < size; i++) {
    permutation[i] = i;
  }
  return permutation;
}

function PartialPivoting(matrix, permutation, pos, row, col) {
  const currentCol = Math.min(pos, col);
  let maxIdx = pos;
  let max = Math.abs(matrix[permutation[pos]][currentCol]);
  for (let i = pos + 1; i < row; i++) {
    const value = Math.abs(matrix[permutation[i]][currentCol]);
    if (value > max) {
      maxIdx = i;
      max = value;
    }
  }
  const t = permutation[pos];
  permutation[pos] = permutation[maxIdx];
  permutation[maxIdx] = t;
}
