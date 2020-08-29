/**
 * Determines whether a Matrix is upper triangular Matrix or not.<br><br>
 * 
 * Upper triangular Matrix is a Matrix in which all the entries below the
 * main diagonal are zero. Note that it can be applied to any non-square Matrix.<br><br>
 *  
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is upper triangular
 */
function isUpperTriangular(digit = this._digit) {
  if (this._isUpperTriangular !== undefined) {
    return this._isUpperTriangular;
  }

  const EPSILON = 1 / ((10 ** digit) * 2);
  const A = this._matrix;
  const [row, col] = this.size();

  if (row === 0) { // []
    this._isUpperTriangular = true;
    return true;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i <= j) {
        continue;
      }
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isUpperTriangular = false;
        return false;
      }
    }
  }
  this._isUpperTriangular = true;
  return true;
};

module.exports = isUpperTriangular;
