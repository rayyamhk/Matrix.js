const { INVALID_MATRIX } = require('../../Error');

/**
 * Get the entries on the main diagonal.
 * @param { Matrix } A - Any matrix
 * @return { Array } - Returns entries of A on the main diagonal
 */

module.exports = function getDiag(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const size = Math.min(row, col);
  const matrix = A._matrix;

  const diags = new Array(size);

  for (let i = 0; i < size; i++) {
    diags[i] = matrix[i][i];
  }

  return diags;
};
