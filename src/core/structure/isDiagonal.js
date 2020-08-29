/**
 * Determines whether a Matrix is diagonal or not.<br><br>
 * 
 * Diagonal Matrix is a Matrix in which the entries outside the main diagonal
 * are all zero. Note that the term diagonal refers to rectangular diagonal.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns rue if the Matrix is diagonal Matrix
 */
function isDiagonal(digit = this._digit) {
  if (this._isDiagonal !== undefined) {
    return this._isDiagonal;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) {
    this._isDiagonal = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
        this.isDiagonal = false;
        return false;
      }
    }
  }
  this._isDiagonal = true;
  return true;
};

module.exports = isDiagonal;
