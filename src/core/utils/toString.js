/**
 * Gets the stringified Matrix
 * @memberof Matrix
 * @instance
 * @returns {string} Stringified Matrix
 */
function toString() {
  const matrix = this._matrix;
  const [row, col] = this.size();

  let str = '';
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      str += matrix[i][j].toString();
      if (j !== col - 1) {
        str += ' ';
      }
    }
    if (i !== row - 1) {
      str += '\n';
    }
  }
  return str;
};

module.exports = toString;
