/* eslint-disable no-param-reassign */
// reference: https://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf

const Complex = require('@rayyamhk/complex');
const Matrix = require('../..');
const { INVALID_SQUARE_MATRIX } = require('../../Error');

/**
 * Find the eigenvalues of any square matrix using QR Algorithm.
 * The eigenvalues can be either real number or complex number.
 * Note that all eigenvalues are instance of Complex,
 * for more details please visit https://github.com/rayyamhk/Complex.js
 * The eigenvalues are cached.
 * @return { Array } - Returns array of eigenvalues
 */

module.exports = function eigenvalues() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._eigenvalues !== undefined) {
    return this._eigenvalues;
  }

  const size = this.size()[0];
  const values = [];
  const digit = this._digit;
  const EPSILON = 1 / ((10 ** digit) * 2);

  const clone = Matrix.clone(this)._matrix;
  let isConvergent = true; // flag
  let skip = false;

  // Transform matrix to Hessenberg matrix
  HouseholderTransform(clone, digit);

  for (let i = size - 1; i > 0; i--) {
    let divergenceCount = 0;
    let prev; // used to determine convergence

    // if obtains complex eigenvalues pair in previous iteration, skip current round
    if (skip) {
      skip = false;
      continue;
    }

    const shift = clone[size - 1][size - 1];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!isConvergent) { // if the current eigenvalue is not real
        prev = size2Eigenvalues(
          clone[i - 1][i - 1],
          clone[i - 1][i],
          clone[i][i - 1],
          clone[i][i],
        ).metric;
      } else { // if the current eigenvalue is real
        prev = Math.abs(clone[i][i - 1]);
      }

      // apply single shift
      for (let j = 0; j < size; j++) {
        clone[j][j] -= shift;
      }

      // Apply QR Algorithm
      HessenbergQR(clone, digit);

      for (let j = 0; j < size; j++) {
        clone[j][j] += shift;
      }

      if (isConvergent && prev < Math.abs(clone[i][i - 1])) {
        divergenceCount++;
      }

      // if the current eigenvalue is real and the entry is almost ZERO => break;
      if (isConvergent && Math.abs(clone[i][i - 1]) < EPSILON) {
        values[i] = new Complex(clone[i][i]);
        break;
      }

      // if the current eigenvalues pair is complex, if the difference of the previous eiganvalues and the
      // eigenvalues of submatrix is almost ZERO => break
      const {
        metric,
        eigen1,
        eigen2,
      } = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]);
      if (!isConvergent && Math.abs(prev - metric) < EPSILON) {
        isConvergent = true; // re-initialize
        skip = true;
        const { re: re1, im: im1 } = eigen1;
        const { re: re2, im: im2 } = eigen2;
        values[i] = new Complex(re1, im1);
        values[i - 1] = new Complex(re2, im2);
        break;
      }

      // if the entry doesn't converge => complex eigenvalues pair
      if (divergenceCount > 3) {
        isConvergent = false;
      }
    }
  }

  if (!skip) {
    values[0] = new Complex(clone[0][0]);
  }

  this._eigenvalues = values;
  return values;
};

function HouseholderTransform(A, digit) {
  const size = A.length;
  const EPSILON = 1 / ((10 ** digit) * 2);

  for (let j = 0; j < size - 2; j++) {
    let xNorm = 0;
    const u = new Array(size - j - 1);
    for (let i = j + 1; i < size; i++) {
      const entry = A[i][j];
      xNorm += entry ** 2;
      u[i - j - 1] = entry;
    }
    xNorm = Math.sqrt(xNorm);

    if (Math.abs(xNorm) < EPSILON) {
      continue;
    }

    if (u[0] >= 0) {
      u[0] += xNorm;
    } else {
      u[0] -= xNorm;
    }

    // Make 'u' unit vector
    let uNorm = 0;
    for (let i = 0; i < u.length; i++) {
      uNorm += u[i] ** 2;
    }
    uNorm = Math.sqrt(uNorm);

    for (let i = 0; i < u.length; i++) {
      u[i] /= uNorm;
    }

    // update the matrix, multiply P from left
    for (let n = j; n < size; n++) { // column
      const v = new Array(size - j - 1);
      for (let m = j + 1; m < size; m++) {
        v[m - j - 1] = A[m][n];
      }

      let scaler = 0;
      for (let m = 0; m < v.length; m++) {
        scaler += v[m] * u[m];
      }
      scaler *= 2;

      for (let m = j + 1; m < size; m++) { // row
        if (n === j && m !== j + 1) {
          A[m][n] = 0;
        } else {
          A[m][n] = v[m - j - 1] - scaler * u[m - j - 1];
        }
      }
    }

    // update the matrix, multiply P from right
    for (let m = 0; m < size; m++) { // row
      const v = new Array(size - j - 1);
      for (let n = j + 1; n < size; n++) {
        v[n - j - 1] = A[m][n];
      }

      let scaler = 0;
      for (let n = 0; n < v.length; n++) {
        scaler += v[n] * u[n];
      }
      scaler *= 2;

      for (let n = j + 1; n < size; n++) { // column
        A[m][n] = v[n - j - 1] - scaler * u[n - j - 1];
      }
    }
  }
}

function HessenbergQR(H, digit) {
  const size = H.length;
  const EPSILON = 1 / ((10 ** digit) * 2);
  const sincos = new Array(size - 1);

  for (let i = 0; i < size - 1; i++) {
    const a = H[i][i];
    const c = H[i + 1][i];

    const norm = Math.sqrt(a ** 2 + c ** 2);
    if (norm < EPSILON) {
      continue;
    }
    const cos = a / norm;
    const sin = (c * -1) / norm;
    sincos[i] = [sin, cos];

    const row1 = new Array(size - i);
    const row2 = new Array(size - i);

    for (let j = i; j < size; j++) {
      row1[j - i] = H[i][j];
      row2[j - i] = H[i + 1][j];
    }

    for (let j = i; j < size; j++) {
      H[i][j] = cos * row1[j - i] + sin * -1 * row2[j - i];
      if (i === j) {
        H[i + 1][j] = 0;
      } else {
        H[i + 1][j] = sin * row1[j - i] + cos * row2[j - i];
      }
    }
  }

  for (let j = 0; j < size - 1; j++) {
    if (!sincos[j]) {
      continue;
    }
    const [sin, cos] = sincos[j];

    const col1 = new Array(j + 2);
    const col2 = new Array(j + 2);
    for (let i = 0; i <= j + 1; i++) {
      col1[i] = H[i][j];
      col2[i] = H[i][j + 1];
    }

    for (let i = 0; i <= j + 1; i++) {
      H[i][j] = col1[i] * cos - col2[i] * sin;
      H[i][j + 1] = col1[i] * sin + col2[i] * cos;
    }
  }
}

// find the eigenvalues of 2x2 matrix
function size2Eigenvalues(e11, e12, e21, e22) {
  const b = (e11 + e22) * -1;
  const c = (e11 * e22 - e21 * e12);
  const delta = b ** 2 - 4 * c;
  let re1;
  let im1;
  let re2;
  let im2;
  if (delta >= 0) {
    im1 = 0;
    im2 = 0;
    if (b >= 0) {
      re1 = (b * -1 - Math.sqrt(delta)) / 2;
    } else {
      re1 = (b * -1 + Math.sqrt(delta)) / 2;
    }
    re2 = c / re1;
  } else {
    re1 = -b / 2;
    re2 = re1;
    im1 = Math.sqrt(delta * -1) / 2;
    im2 = im1 * -1;
  }
  return {
    metric: Math.sqrt(re1 ** 2 + im1 ** 2),
    eigen1: { re: re1, im: im1 },
    eigen2: { re: re2, im: im2 },
  };
}
