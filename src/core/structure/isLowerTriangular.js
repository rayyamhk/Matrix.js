/**
 * Determines whether a Matrix is lower triangular Matrix or not.<br><br>
 * 
 * Lower triangular Matrix is a Matrix in which all the entries
 * above the main diagonal are zero. Note that it can be applied
 * to any non-square Matrix.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is lower triangular
 */

function isLowerTriangular(digit = this._digit) {
  if (this._isLowerTriangular !== undefined) {
    return this._isLowerTriangular;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) { // []
    this._isLowerTriangular = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = i + 1; j < col; j++) {
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isLowerTriangular = false;
        return false;
      }
    }
  }
  this._isLowerTriangular = true;
  return true;
};

module.exports = isLowerTriangular;
