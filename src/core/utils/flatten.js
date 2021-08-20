/**
 * Flatten the matrix to an array
 * @memberof Matrix
 * @instance
 * @returns {Array} A flatten array
 */
function flatten() {
  const [row, col] = this.size();
  const length = row * col;
  const arr = new Array(length);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      arr[i * col + j] = this._matrix[i][j];
    }
  }
  return arr;
};

module.exports = flatten;
