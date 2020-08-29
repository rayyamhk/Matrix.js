const { INVALID_MATRIX } = require('../../Error');

/**
 * Calculates the LUP decomposition of the Matrix,
 * where L is lower triangular matrix which diagonal entries are always 1,
 * U is upper triangular matrix, and P is permutation matrix.<br><br>
 * 
 * It is implemented using Gaussian Elimination with Partial Pivoting in order to
 * reduce the error caused by floating-point arithmetic.<br><br>
 * 
 * Note that if optimized is true, P is a Permutation Array and both L and U are merged
 * into one matrix in order to improve performance.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {boolean} [optimized=false] - Returns [P, LU] if it is true, [P, L, U] if it is false
 * @returns {Matrix[]} The LUP decomposition of Matrix
 */
function LU(A, optimized = false) {
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

module.exports = LU;
