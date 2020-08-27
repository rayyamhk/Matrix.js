/**
 * Find the nullity of any matrix.
 * The nullity is cached.
 * @return { Number } - Returns the nullity of the matrix
 */

module.exports = function nullity() {
  if (this._nullity !== undefined) {
    return this._nullity;
  }

  const col = this.size()[1];
  const rank = this.rank();

  this._nullity = col - rank;
  return this._nullity;
};
