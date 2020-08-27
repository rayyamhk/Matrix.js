const Matrix = require('../..');
const { INVALID_P_NORM, SINGULAR_MATRIX, INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Find the condition number of square matrix with respect to different matrix norm.
 * The condition numbers is not cached.
 * @param { Number | String } p - Type of matrix norm, it can be 1, 2, Infinity or 'F'
 * @return { Number } - Condition number
 */

module.exports = function cond(p = 2) {
  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  try {
    const inverse = Matrix.inverse(this);
    return inverse.norm(p) * this.norm(p);
  } catch (error) {
    if (error.message === SINGULAR_MATRIX) {
      return Infinity;
    }
    throw error;
  }
};
