const empty = require('../../util/empty');
const { INVALID_MATRIX, SIZE_INCOMPATIBLE } = require('../../Error');

/**
 * Find the product of two matrices.
 * @param { Matrix } A - Any matrix
 * @param { Matrix } B - Any matrix that is size-compatible with A
 * @return { Matrix } - Product of two matrices
 */

module.exports = function multiply(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [Arow, Acol] = A.size();
  const [Brow, Bcol] = B.size();

  if (Acol !== Brow) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const matrixA = A._matrix;
  const matrixB = B._matrix;

  const result = empty(Arow, Bcol);

  for (let i = 0; i < Arow; i++) {
    for (let j = 0; j < Bcol; j++) {
      result[i][j] = 0;
      for (let k = 0; k < Brow; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return new this(result);
};
