const { INVALID_MATRIX } = require('../../Error');

/**
 * Gets the entries on the main diagonal.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {number[]} Array of entries of A on the main diagonal
 */
function getDiag(A) {
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

module.exports =  getDiag;
