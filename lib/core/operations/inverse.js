const { INVALID_MATRIX, INVALID_SQUARE_MATRIX, SINGULAR_MATRIX } = require('../../Error');
const Matrix = require('../..');

function initPermutation(size) {
  const permutation = new Array(size);
  for (let i = 0; i < size; i++) {
    permutation[i] = i;
  }
  return permutation;
}

/**
 * Find the inverse of non-singular square matrix using Elementary Row Operations.
 * @param { Matrix } A - Any non-singular square matrix
 * @return { Matrix } - inverse of A
 */

module.exports = function inverseerrse(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  const size = A.size()[0];
  if (size === 0) { // inverse of 0x0 matrix is itself
    return new Matrix([]);
  }

  const EPSILON = 1 / ((10 ** A._digit) * 2);
  const inv = this.identity(size)._matrix;
  const clone = this.clone(A)._matrix;
  const permutation = initPermutation(size);

  // iterate each column
  for (let j = 0; j < size; j++) {
    let pivotIdx = j;
    let pivot = clone[permutation[j]][j];
    while (Math.abs(pivot) < EPSILON && pivotIdx < size - 1) {
      pivotIdx++;
      pivot = clone[permutation[pivotIdx]][j];
    }

    if (Math.abs(pivot) < EPSILON) {
      throw new Error(SINGULAR_MATRIX);
    }

    if (j !== pivotIdx) {
      const temp = permutation[j];
      permutation[j] = permutation[pivotIdx];
      permutation[pivotIdx] = temp;
    }

    const pivotRow = permutation[j];

    // the pivot is guaranteed to be non-zero
    for (let i = 0; i < size; i++) {
      const ith = permutation[i];

      if (i === j) {
        for (let k = 0; k < size; k++) {
          if (k === j) {
            clone[ith][k] = 1;
          }
          if (k > j) {
            clone[ith][k] /= pivot;
          }
          inv[ith][k] /= pivot;
        }
        pivot = 1;
      }

      if (i !== j && Math.abs(clone[ith][j]) >= EPSILON) {
        const factor = clone[ith][j] / pivot;

        for (let k = 0; k < size; k++) {
          if (k === j) {
            clone[ith][k] = 0;
          }
          if (k > j) {
            clone[ith][k] -= factor * clone[pivotRow][k];
          }
          inv[ith][k] -= factor * inv[pivotRow][k];
        }
      }
    }
  }

  for (let i = 0; i < size; i++) {
    clone[i] = inv[permutation[i]];
  }

  return new this(clone);
};
