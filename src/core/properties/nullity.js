/**
 * Calculates the nullity of any Matrix, which is the dimension
 * of the nullspace.<br><br>
 * 
 * The nullity is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The nullity of the matrix
 */
function nullity() {
  if (this._nullity !== undefined) {
    return this._nullity;
  }

  const col = this.size()[1];
  const rank = this.rank();

  this._nullity = col - rank;
  return this._nullity;
};

module.exports = nullity;
