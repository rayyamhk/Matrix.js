const { INVALID_MATRIX } = require('../../Error');

/**
 * Find the QR decomposition of a given matrix,
 * where Q is orthogonal matrix, R is upper triangular matrix.
 * @param { Matrix } A - Any matrix
 * @return { Array } - Return [Q, R], which is the QR decomposition of A
 */

module.exports = function QR(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const size = Math.min(row, col);

  const EPSILON = 1 / ((10 ** A._digit) * 2);

  const R = this.clone(A);
  const matrixR = R._matrix;
  const Q = this.identity(row);
  const matrixQ = Q._matrix;

  for (let j = 0; j < size; j++) {
    // if all entries below main diagonal are considered as zero, skip this round
    let skip = true;
    for (let i = j + 1; i < row; i++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        skip = false;
        break;
      }
    }

    if (!skip) {
      // Apply Householder transform
      let norm = 0;
      for (let i = j; i < row; i++) {
        norm += matrixR[i][j] ** 2;
      }
      norm = Math.sqrt(norm);

      // reduce floating point arithmatic error
      let s = -1;
      if (matrixR[j][j] < 0) {
        s = 1;
      }
      const u1 = matrixR[j][j] - s * norm;

      let w = this.submatrix(R, `${j}:`, j);
      w = this.elementwise(w, (entry) => entry / u1)._matrix;
      w[0][0] = 1;

      const tau = (-1 * s * u1) / norm;

      const subR = new Array(row - j);
      for (let i = 0; i < row - j; i++) {
        const newRow = new Array(col);
        for (let k = 0; k < col; k++) {
          newRow[k] = matrixR[j + i][k];
        }
        subR[i] = newRow;
      }

      for (let i = j; i < row; i++) {
        for (let k = 0; k < col; k++) {
          let summation = 0;
          for (let m = 0; m < row - j; m++) {
            summation += subR[m][k] * w[m][0];
          }
          matrixR[i][k] = subR[i - j][k] - tau * w[i - j][0] * summation;
        }
      }

      const subQ = new Array(row);
      for (let i = 0; i < row; i++) {
        const newRow = new Array(row - j);
        for (let k = 0; k < row - j; k++) {
          newRow[k] = matrixQ[i][j + k];
        }
        subQ[i] = newRow;
      }

      for (let i = 0; i < row; i++) {
        for (let k = j; k < row; k++) {
          let summation = 0;
          for (let m = 0; m < row - j; m++) {
            summation += subQ[i][m] * w[m][0];
          }
          matrixQ[i][k] = subQ[i][k - j] - tau * w[k - j][0] * summation;
        }
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i > j) {
        matrixR[i][j] = 0;
      }
    }
  }

  return [Q, R];
};
