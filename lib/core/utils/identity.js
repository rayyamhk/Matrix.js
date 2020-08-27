/**
 * Generate identity matrix with given size.
 * @param { Integer } size - The size of matrix
 * @return { Matrix } - Returns identity matrix
 */

module.exports = function identity(size) {
  return this.generate(size, size, (i, j) => {
    if (i === j) {
      return 1;
    }
    return 0;
  });
};
