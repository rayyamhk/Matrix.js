const isMatrix = require('./util/isMatrix');
const { INVALID_MATRIX } = require('./Error');

/**
 * Creates a new Matrix
 * @namespace Matrix
 * @class
 * @param {number[][]} A - Two dimensional array where
 * A[i][j] represents the i-th row and j-th column of a matrix
 */
function Matrix(A) {
  if (!isMatrix(A)) {
    throw new Error(INVALID_MATRIX);
  }
  this._matrix = A;
  this._digit = 8;
}

module.exports = Matrix;

// structure
Matrix.prototype.isDiagonal = require('./core/structure/isDiagonal');
Matrix.prototype.isSkewSymmetric = require('./core/structure/isSkewSymmetric');
Matrix.prototype.isSquare = require('./core/structure/isSquare');
Matrix.prototype.isSymmetric = require('./core/structure/isSymmetric');
Matrix.prototype.isLowerTriangular = require('./core/structure/isLowerTriangular');
Matrix.prototype.isUpperTriangular = require('./core/structure/isUpperTriangular');
Matrix.prototype.isOrthogonal = require('./core/structure/isOrthogonal');

// property
Matrix.prototype.cond = require('./core/properties/cond');
Matrix.prototype.det = require('./core/properties/det');
Matrix.prototype.eigenvalues = require('./core/properties/eigenvalues');
Matrix.prototype.nullity = require('./core/properties/nullity');
Matrix.prototype.norm = require('./core/properties/norm');
Matrix.prototype.rank = require('./core/properties/rank');
Matrix.prototype.size = require('./core/properties/size');
Matrix.prototype.trace = require('./core/properties/trace');

// operations
Matrix.add = require('./core/operations/add');
Matrix.inverse = require('./core/operations/inverse');
Matrix.multiply = require('./core/operations/multiply');
Matrix.pow = require('./core/operations/pow');
Matrix.subtract = require('./core/operations/subtract');
Matrix.transpose = require('./core/operations/transpose');

// Linear-equations
Matrix.backward = require('./core/linear-equations/backward');
Matrix.forward = require('./core/linear-equations/forward');
Matrix.solve = require('./core/linear-equations/solve');

// decompositions
Matrix.LU = require('./core/decompositions/LU');
Matrix.QR = require('./core/decompositions/QR');

// utils
Matrix.clone = require('./core/utils/clone');
Matrix.column = require('./core/utils/column');
Matrix.diag = require('./core/utils/diag');
Matrix.elementwise = require('./core/utils/elementwise');
Matrix.generate = require('./core/utils/generate');
Matrix.getDiag = require('./core/utils/getDiag');
Matrix.getRandomMatrix = require('./core/utils/getRandomMatrix');
Matrix.identity = require('./core/utils/identity');
Matrix.isEqual = require('./core/utils/isEqual');
Matrix.row = require('./core/utils/row');
Matrix.submatrix = require('./core/utils/submatrix');
Matrix.zero = require('./core/utils/zero');

Matrix.prototype.entry = require('./core/utils/entry');
Matrix.prototype.toString = require('./core/utils/toString');
