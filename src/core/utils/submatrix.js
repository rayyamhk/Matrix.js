const {
  INVALID_MATRIX,
  EXPECTED_STRING_NUMBER_AT_POS_1_2,
  INVALID_ROW,
  INVALID_COLUMN,
  OVERFLOW_ROW,
  INVALID_ROWS_EXPRESSION,
  INVALID_COLUMNS_EXPRESSION,
  OVERFLOW_COLUMN,
} = require('../../Error');

/**
 * Generates a submatrix of a matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {string|number} rows - Rows expression
 * @param {string|number} cols - Columns expression
 * @returns {Matrix} Submatrix of A
 */
function submatrix(A, rows, cols) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const arg1Type = typeof rows;
  const arg2Type = typeof cols;

  if ((arg1Type !== 'string' && arg1Type !== 'number') || (arg2Type !== 'string' && arg2Type !== 'number')) {
    throw new Error(EXPECTED_STRING_NUMBER_AT_POS_1_2);
  }

  const [row, col] = A.size();
  let rowStart;
  let rowEnd;
  let colStart;
  let colEnd;

  if (arg1Type === 'number') {
    if (!Number.isInteger(rows) || rows < 0) {
      throw new Error(INVALID_ROW);
    }

    if (rows >= row) {
      throw new Error(OVERFLOW_ROW);
    }

    rowStart = rows;
    rowEnd = rows;
  } else { // string
    const arg = rows.split(':');
    if (arg.length !== 2) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }
    const [r1, r2] = arg;
    if (r1 === '') {
      rowStart = 0;
    } else {
      const r = Number(r1);
      if (!Number.isInteger(r) || r < 0) {
        throw new Error(INVALID_ROW);
      }
      if (r >= row) {
        throw new Error(OVERFLOW_ROW);
      }
      rowStart = r;
    }

    if (r2 === '') {
      rowEnd = row - 1;
    } else {
      const r = Number(r2);
      if (!Number.isInteger(r) || r < 0) {
        throw new Error(INVALID_ROW);
      }
      if (r >= row) {
        throw new Error(OVERFLOW_ROW);
      }
      rowEnd = r;
    }
    if (rowStart > rowEnd) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }
  }

  if (arg2Type === 'number') {
    if (!Number.isInteger(cols) || cols < 0) {
      throw new Error(INVALID_COLUMN);
    }

    if (cols >= col) {
      throw new Error(OVERFLOW_COLUMN);
    }

    colStart = cols;
    colEnd = cols;
  } else { // string
    const arg = cols.split(':');
    if (arg.length !== 2) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }
    const [c1, c2] = arg;
    if (c1 === '') {
      colStart = 0;
    } else {
      const c = Number(c1);
      if (!Number.isInteger(c) || c < 0) {
        throw new Error(INVALID_COLUMN);
      }
      if (c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }
      colStart = c;
    }

    if (c2 === '') {
      colEnd = col - 1;
    } else {
      const c = Number(c2);
      if (!Number.isInteger(c) || c < 0) {
        throw new Error(INVALID_COLUMN);
      }
      if (c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }
      colEnd = c;
    }
    if (colStart > colEnd) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }
  }

  const matrix = A._matrix;
  const subRow = rowEnd - rowStart + 1;
  const subCol = colEnd - colStart + 1;

  const subMatrix = new Array(subRow);

  for (let i = rowStart; i <= rowEnd; i++) {
    const newRow = new Array(subCol);
    for (let j = colStart; j <= colEnd; j++) {
      newRow[j - colStart] = matrix[i][j];
    }
    subMatrix[i - rowStart] = newRow;
  }

  return new this(subMatrix);
};

module.exports = submatrix;
