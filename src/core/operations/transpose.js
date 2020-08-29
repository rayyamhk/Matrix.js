const { INVALID_MATRIX } = require('../../Error');

/**
 * Find the transpose of a matrix.
 * @memberof Matrix
 * @static
 * @param { Matrix } A - Any Matrix
 * @returns { Matrix } Returns transpose of A
 */
function transpose(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const matrix = A._matrix;

  return this.generate(col, row, (i, j) => matrix[j][i]);
};

module.exports = transpose;
