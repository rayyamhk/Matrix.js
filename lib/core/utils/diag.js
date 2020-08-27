const Matrix = require('../..');
const isNumber = require('../../util/isNumber');
const { INVALID_ARRAY, EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES, INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Generate diagonal matrix if the argument is an array of numbers,
 * generate block diagonal matrix if the argument is an array of matrices.
 * @param { Array } A - Array of numbers or matrices
 * @return { Array } - Returns a block diagonal matrix
 */

module.exports = function diag(values) {
  if (!Array.isArray(values)) {
    throw new Error(INVALID_ARRAY);
  }

  const argsNum = values.length;
  let variant;

  for (let i = 0; i < argsNum; i++) {
    const entry = values[i];
    if (!isNumber(entry) && !(entry instanceof Matrix)) {
      throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
    }
    if (isNumber(entry)) {
      if (!variant) {
        variant = 'number';
        continue;
      }
      if (variant !== 'number') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    } else {
      if (!entry.isSquare()) {
        throw new Error(INVALID_SQUARE_MATRIX);
      }
      if (!variant) {
        variant = 'square';
        continue;
      }
      if (variant !== 'square') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    }
  }

  // HERE: variant should be either 'number' or 'square'
  if (variant === 'number') {
    return Matrix.generate(argsNum, argsNum, (i, j) => {
      if (i === j) {
        return values[i];
      }
      return 0;
    });
  }

  // Guaranteed that [values] is a list of square matrices
  let size = 0;
  const temp = new Array(argsNum);
  for (let i = 0; i < argsNum; i++) {
    const len = values[i].size()[0];
    size += len;
    temp[i] = len;
  }

  let idx = 0;
  let start = 0;
  let len = temp[idx];
  return Matrix.generate(size, size, (i, j) => {
    if (i - start === len && j - start === len) {
      start += len;
      idx++;
    }
    const ith = i - start; // ith < 0 if below main diagonal
    const jth = j - start; // jth < 0 if above main diagonal

    // skip 0x0 matrices
    len = temp[idx];
    while (len === 0) {
      idx++;
      len = temp[idx];
    }

    if ((ith < len && ith >= 0) && (jth < len && jth >= 0)) {
      return values[idx]._matrix[ith][jth];
    }
    return 0;
  });
};
