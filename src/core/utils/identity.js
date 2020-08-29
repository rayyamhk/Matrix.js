/**
 * Generates identity Matrix with given size.
 * @memberof Matrix
 * @static
 * @param {number} size - The size of Matrix
 * @returns {Matrix} Identity Matrix
 */
function identity(size) {
  return this.generate(size, size, (i, j) => {
    if (i === j) {
      return 1;
    }
    return 0;
  });
};

module.exports = identity;
