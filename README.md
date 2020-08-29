# Matrix.js
A professional, comprehensive and high-performance library for you to manipulate matrices.

## Features
- Professional
- Comprehensive
- High-performance
- Matrix properties are cached
- Easy to use
- 3000+ Test cases

## Install
```
npm install --save @rayyamhk/matrix
```

## How to use
```javascript
const Matrix = require('@rayyamhk/matrix');

const A = new Matrix([
  [1, 2],
  [3, 4],
]);
const B = new Matrix([
  [2, 3],
  [4, 5],
]);
const Sum = Matrix.add(A, B);
const [Q, R] = Matrix.QR(Sum);
const det = Sum.det();
const eigenvalues = Sum.eigenvalues();
```

## Build
```
npm install
npm run build
```
It creates a production version in `/lib`

## Test
```
npm install
npm run test
```
It runs all tests in `/src/tests`

## API
- [constructor](#constructora)
- [Decompositions](#decompositions)
  - [LU](#lua-optimized)
  - [QR](#qra)
- [Linear Equations](#linear-equations)
  - [backward](#backwardu-y)
  - [forward](#forwardl-y)
  - [solve](#solvea-y)
- [Operations](#operations)
  - [add](#adda-b)
  - [inverse](#inversea)
  - [multiply](#multiplya-b)
  - [pow](#powa-n)
  - [subtract](#subtracta-b)
  - [transpose](#transposea)
- [Properties](#properties)
  - [cond](#condp--2)
  - [det](#det)
  - [eigenvalues](#eigenvalues)
  - [norm](#normp)
  - [nullity](#nullity)
  - [rank](#rank)
  - [size](#size)
  - [trace](#trace)
- [Structure](#structure)
  - [isDiagonal](#isdiagonaldigit--8)
  - [isLowerTriangular](#islowertriangulardigit--8)
  - [isOrthogonal](#isorthogonaldigit--8)
  - [isSkewSymmetric](#isskewsymmetricdigit--8)
  - [isSquare](#issquare)
  - [isSymmetric](#issymmetricdigit--8)
  - [isUpperTriangular](#isuppertriangulardigit--8)
- [Utilities](#utilities)
  - [clone](#clonea)
  - [column](#columna-index)
  - [diag](#diagvalues)
  - [elementwise](#elementwisea-cb)
  - [entry](#entryrow-col)
  - [generate](#generaterow-col-cb)
  - [getDiag](#getdiaga)
  - [getRandomMatrix](#getrandommatrixrow-col-min--0-max--1-tofixed--0)
  - [identity](#identitysize)
  - [isEqual](#isequala-b-digit--5)
  - [row](#rowa-index)
  - [submatrix](#submatrixa-rowsexp-colsexp)
  - [toString](#tostring)
  - [zero](#zerorow-col)

### constructor(A)
```
@param { Array } A - Two dimensional array where A[i][j] represents the i-th row and j-th column of a matrix
@return { Matrix } - Returns instance of Matrix
```
```javascript
new Matrix([]); // 0x0 matrix

new Matrix([
  [1, 2, 3, 4],
]); // 1x4 matrix

new Matrix([
  [1],
  [2],
  [3],
]); // 3x1 matrix

new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]); // 3x3 matrix
```
[Table of Content](#api)

### Decompositions

#### LU(A, optimized)
```
@param { Matrix } A - Any matrix
@param { Boolean } optimized - Returns [P, LU] if it is true, [P, L, U] if it is false
@return { Array } - Returns the LUP decomposition of matrix
```
Find the LUP decomposition of a matrix, where L is lower triangular matrix which diagonal entries are always 1, U is upper triangular matrix, and P is permutation matrix. It is implemented using Gaussian Elimination with Partial Pivoting. The reason of using Partial Pivoting is to reduce the error caused by floating-point arithmetic. If you choose the optimized algorithm, both L and U are merged into one matrix in order to improve performance.
```javascript
const A = new Matrix([
  [4, 3],
  [6, 3],
]);

const [P, L, U] = Matrix.LU(A, false);
// P is [[0, 1], [1, 0]], L is [[1, 0], [2/3, 1]], U is [[6, 3], [0, 1]] and A = PLU.

const [P, LU] = Matrix.LU(A, true);
// P is [ 1, 0 ], LU = [[6, 3], [2/3, 1]]
// Note: P is an permutation array, L and U can be extracted from LU.
```
[Table of Content](#api)

#### QR(A)
```
@param { Matrix } A - Any matrix
@return { Array } - Returns [Q, R], which is the QR decomposition of A
```
Find the QR decomposition of a matrix, where Q is orthogonal matrix, R is upper triangular matrix. The algorithm is implemented using Householder Transform instead of Gram–Schmidt process because the Householder Transform is more numerically stable.
```javascript
const A = new Matrix([
  [12, -51, 4],
  [6, 167, -68],
  [-4, 24, -41],
]);

const [Q, R] = Matrix.QR(A);
// Q is [[-0.8571, 0.3943, 0.3314], [-0.4286, -0.9029, -0.0343], [0.2857, -0.1714, 0.9429]],
// R is [[-14, -21, 14], [0, -175, 70], [0, 0, -35]],
// and A = QR
```
[Table of Content](#api)

### Linear-Equations

#### backward(U, y)
```
@param { Matrix } U - n x n upper triangular matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Ux = y
```
Solve system of linear equations Ux = y using backward substitution, where U is an upper triangular matrix. If there is no unique solutions, an error is thrown.
```javascript
const A = new Matrix([
  [1, 2],
  [0, 3],
]);

const y = new Matrix([
  [1],
  [3],
]);

try {
  const x = Matrix.backward(A, y); // [[-1], [1]]
} catch (e) {
  console.log(e.message);
}
```
[Table of Content](#api)

#### forward(L, y)
```
@param { Matrix } L - n x n lower triangular matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Lx = y
```
Solve system of linear equations Lx = y using forward substitution, where L is a lower triangular matrix. If there is no unique solutions, an error is thrown.
```javascript
const A = new Matrix([
  [1, 0],
  [2, 3],
]);

const y = new Matrix([
  [1],
  [8],
]);

try {
  const x = Matrix.forward(A, y); // [[1], [2]]
} catch (e) {
  console.log(e.message);
}
```
[Table of Content](#api)

#### solve(A, y)
```
@param { Matrix } A - n x n square matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Ax = y
```
Solve system of linear equations Ax = y using LU decomposition. If there is no unique solutions, an error is thrown.
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

const y = new Matrix([
  [5],
  [11],
]);

try {
  const x = Matrix.solve(A, y); // [[1], [2]]
} catch (e) {
  console.log(e.message);
}
```
[Table of Content](#api)

### Operations

#### add(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that has same size with A
@return { Matrix } - Returns sum of two matrices
```
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

const B = new Matrix([
  [5, 6],
  [7, 8],
]);

const Sum = Matrix.add(A, B); // [[6, 8], [10, 12]]
```
[Table of Content](#api)

#### inverse(A)
```
@param { Matrix } A - Any non-singular matrix
@return { Matrix } - Returns the inverse of A
```
Find the inverse of non-singular matrix using Elementary Row Operations. If the matrix is singular, an error is thrown.
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

try {
  const inv = Matrix.inverse(A); // [[-2, 1], [1.5, -0.5]]
} catch (e) {
  console.log(e.message);
}
```
[Table of Content](#api)

#### multiply(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that is size-compatible with A
@return { Matrix } - Returns the product of two matrices
```
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const B = new Matrix([
  [-1, -2],
  [3, 4],
  [-5, -6],
]);

const Product = Matrix.multiply(A, B); // [[-10, -12], [-19, -24]]
```
[Table of Content](#api)

#### pow(A, n)
```
@param { Matrix } A - Any square matrix
@param { Number } exponent - Any Non-negative integer
@return { Matrix } - Returns the power of A
```
The algorithm is implemented recursively.
```javascript
const A = new Matrix([
  [2, 0],
  [0, 2],
]);

const Result = Matrix.pow(A, 10); // [[1024, 0], [0, 1024]]
```
[Table of Content](#api)

#### subtract(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that has same size with A
@return { Matrix } - Returns difference of two matrices
```
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

const B = new Matrix([
  [4, 3],
  [2, 1],
]);

const Diff = Matrix.subtract(A, B); // [[-3, -1], [1, 3]]
```
[Table of Content](#api)

#### transpose(A)
```
@param { Matrix } A - Any matrix
@return { Matrix } - Returns transpose of A
```
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const T = Matrix.transpose(A); // [[1, 4], [2, 5], [3, 6]]
```
[Table of Content](#api)

### Properties

#### cond(p = 2)
```
@param { Number | String } p - Type of matrix norm, it can be 1, 2, Infinity or 'F'
@return { Number } - Returns the condition number of matrix
```
Find the condition number of square matrix with respect to different matrix norm. If the matrix is singular, returns Infinity. The condition number is **not cached**.
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [1, 2, 7],
]);

A.cond(1); // 64
A.cond(2); // 32.844126527227147
A.cond(Infinity); // 42.4999,
A.cond('F'); // 34.117851306578174
```
[Table of Content](#api)

#### det()
```
@return { Number } - Returns the determinant of square matrirx
```
Find the determinant of square matrirx. The determinant is **cached**.
```javascript
const A = new Matrix([
  [1, 3, 5, 9],
  [1, 3, 1, 7],
  [4, 3, 9, 7],
  [5, 2, 0, 9],
]);

A.det(); // -376
```
[Table of Content](#api)

#### eigenvalues()
```
@return { Array } - Returns array of eigenvalues
```
Find the eigenvalues of any square matrix using QR Algorithm with single shift. The eigenvalues can be either real number or complex number. Note that all eigenvalues are instance of **Complex**, for more details please visit [Complex.js](https://github.com/rayyamhk/Complex.js). The eigenvalues are **cached**.
```javascript
const A = new Matrix([
  [13, -12, 6, -9],
  [1, -11, -13, 0],
  [-6, -2, 15, -6],
  [14, -8, 1, 11],
]);

const eigenvalues = A.eigenvalues();
eigenvalues.forEach((eigenvalue) => {
  console.log(eigenvalue.toString()); // Instance method of Complex
});

// Result: '10.7046681565572', '-12.9152701010176', '15.1053009722302 + 14.3131819845827i', '15.1053009722302 - 14.3131819845827i'
```
[Table of Content](#api)

#### norm(p)
```
@param { Number | String } p - The choice of matrix norm, it can be 1, 2, Infinity or 'F'
@return { Number } - Returns p-norm of the matrix.
```
Find the matrix norm of any matrix with respect to the choice of norm. The norms are **not cached**.\
1-norm: maximum absolute column sum of the matrix\
2-norm: the largest singular value of matrix\
Infinity-norm: maximum absolute row sum of the matrix\
Frobenius norm: Euclidean norm invloving all entries\
```javascript
const A = new Matrix([
  [1, 7, -5, 2, -7],
  [-8, 0, 2, 9, 4],
  [3, 4, 9, 6, 5],
]);
A.norm(1); // 17
A.norm(2); // 15.849881886952135
A.norm(Infinity); // 27
A.norm('F'); // 21.447610589527216
```
[Table of Content](#api)

#### nullity()
```
@return { Number } - Returns the nullity of the matrix
```
Find the nullity of any matrix, which is the dimension of the nullspace. The nullity is **cached**.
```javascript
const A = new Matrix([
  [0, 1, 2],
  [1, 2, 1],
  [2, 7, 8],
]);

A.nullity(); // 1
```
[Table of Content](#api)

#### rank()
```
@return { Number } - Returns the rank of the matrix
```
Find the rank of any matrix, which is the dimension of the row space. The rank is **cached**.
```javascript
const A = new Matrix([
  [0, 1, 2],
  [1, 2, 1],
  [2, 7, 8],
]);

A.rank(); // 2
```
[Table of Content](#api)

#### size()
```
@return { Array } - Returns the number of rows and columns of a matrix.
```
Find the size of any matrix, which is in the form of \[row, column\]. The size of matrix is **cached**.
```javascript
const A = new Matrix([
  [0, 1, 2, 3],
  [4, 5, 6, 7],
]);

const [row, col] = A.size(); // 2, 4
```
[Table of Content](#api)

#### trace()
```
@return { Number } - Returns the trace of the square matrix.
```
Find the trace of any square matrix, which is the sum of all entries on the main diagonal. The trace is **cached**.
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

A.trace(); // 15
```
[Table of Content](#api)

### Structure

#### isDiagonal(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the matrix is diagonal matrix
```
Diagonal matrix is a matrix in which the entries outside the main diagonal are all zero. Note that the term diagonal refers to **rectangular diagonal**. The result is **cached**.
```javascript
const A = new Matrix([
  [1, 0, 0],
  [0, 5, 0],
  [0, 0, -3],
]);

const B = new Matrix([
  [1, 0, 0.1],
  [0, 5, 0],
  [0, 0, -3],
]);

A.isDiagonal(); // true
B.isDiagonal(); // false
```
[Table of Content](#api)

#### isLowerTriangular(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the matrix is lower triangular
```
Lower triangular matrix is a matrix in which all the entries above the main diagonal are zero. Note that it can be applied to any non-square matrix. The result is **cached**.
```javascript
const A = new Matrix([
  [6, 0, 0, 0],
  [1, -5, 0, 0],
  [2, 30, 1, 0],
]);

A.isLowerTriangular(); // true
```
[Table of Content](#api)

#### isOrthogonal(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the square matrix is orthogonal
```
Orthogonal matrix is a matrix in which all rows and columns are orthonormal vectors. The result is **cached**.
```javascript
const Reflection = new Matrix([
  [1, 0],
  [0, -1],
]);

Reflection.isOrthongonal(); // true
```
[Table of Content](#api)

#### isSkewSymmetric(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the square matrix is skew symmetric
```
Skew symmetric matrix is a square matrix whose transpose equals its negative. The result is **cached**.
```javascript
const A = new Matrix([
  [1, 2, 3, 4],
  [-2, 2, -4, 5],
  [-3, 4, 100, 10],
  [-4, -5, -10, 5],
]);

A.isSkewSymmetric(); // true
```
[Table of Content](#api)

#### isSquare()
```
@return { Boolean } - Returns true if the matrix is square
```
Square matrix is a matrix with same number of rows and columns. The result is **cached**.
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);
A.isSquare(); // true
```
[Table of Content](#api)

#### isSymmetric(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the square matrix is symmetric
```
symmetric matrix is a square matrix that is equal to its transpose. The result is **cached**.
```javascript
const A = new Matrix([
  [1, 4, 3],
  [4, 5, 4],
  [3, 4, 5],
]);

A.isSymmetric(); // true
```
[Table of Content](#api)

#### isUpperTriangular(digit = 8)
```
@param { Number } digit - Number of significant digits
@return { Boolean } - Returns true if the matrix is upper triangular
```
Upper triangular matrix is a matrix in which all the entries below the main diagonal are zero. Note that it can be applied to any non-square matrix. The result is **cached**
```javascript
const A = new Matrix([
  [6, 0, 1, 5],
  [0, -5, 4, 7],
  [0, 0, 1, 2],
]);

A.isUpperTriangular(); // true
```
[Table of Content](#api)

### Utilities

#### clone(A)
```
@param { Matrix } A - Any matrix
@return { Matrix } - Returns a copy of A
```
Create a copy of matrix. Note that it resets the cached data.
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

Matrix.clone(A); // [[1, 2], [3, 4]]
```
[Table of Content](#api)

#### column(A, index)
```
@param { Matrix } A - Any matrix
@param { Integer } index - Any valid column index
@return { Matrix } - Returns column of A
```
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
  [5, 6],
]);

Matrix.column(A, 0); // [[1], [3], [5]]
Matrix.column(A, 1); // [[2], [4], [6]]
```
[Table of Content](#api)

#### diag(values)
```
@param { Array } values - Array of numbers or matrices
@return { Array } - Returns a block diagonal matrix
```
Generate diagonal matrix if the argument is an array of numbers, generate block diagonal matrix if the argument is an array of matrices.
```javascript
Matrix.diag([1, 2, 3]); // [[1, 0, 0], [0, 2, 0], [0, 0, 3]]

const values = [
  new Matrix([
    [1, 2],
    [3, 4],
  ]),
  new Matrix([
    [5, 6],
    [7, 8],
  ])
];

Matrix.diag(values); // [[1, 2, 0, 0], [3, 4, 0, 0], [0, 0, 5, 6], [0, 0, 7, 8]]
```
[Table of Content](#api)

#### elementwise(A, cb)
```
@param { Matrix } A - Any matrix
@param { Function } cb - Callback function which applies on each entry of A
@return { Matrix } - Returns a copy of new matrix
```
Apply a function over each entry of a matrix and return a new copy of the new matrix.
```javascript
Matrix.elementwise(A, (entry) => entry * 2); // element-wise multiplication
Matrix.elementwise(A, (entry) => entry ** 2); // element-wise power
Matrix.elementwise(A, (entry) => entry - 10); // element-wise subtraction
```
[Table of Content](#api)

#### entry(row, col)
```
@param { Integer } row - Any valid row index
@param { Integer } col - Any valid column index
@return { Number } - Returns entry of the matrix
```
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

A.entry(0, 0); // 1
A.entry(0, 1); // 2
A.entry(1, 0); // 3
A.entry(1, 1); // 4
```
[Table of Content](#api)

#### generate(row, col, cb)
```
@param { Integer } row - Number of rows of matrix
@param { Integer } col - Number of columns of matrix
@param { Function } cb - Callback function which takes row and column as arguments and generate the corresponding entry
```
Generate a matrix which entries are the returned value of callback function.
```javascript
Matrix.generate(3, 3, () => 0); // 3 x 3 zero matrix
Matrix.generate(3, 3, (i, j) => 1 / (i + j + 1)); // 3 x 3 Hilbert matrix
Matrix.generate(3, 3, (i, j) => i >= j ? 1 : 0); // 3 x 3 lower triangular matrix
```
[Table of Content](#api)

#### getDiag(A)
```
@param { Matrix } A - Any matrix
@return { Array } - Returns entries of A on the main diagonal
```
```javascript
const A = new Matrix([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
]);

Matrix.getDiag(A); // [1, 6]
```
[Table of Content](#api)

#### getRandomMatrix(row, col, min = 0, max = 1, toFixed = 0)
```
@param { Integer } row - Number of rows of a matrix
@param { Integer } col - Number of columns of a matrix
@param { Number } min - Lower bound of each entry
@param { Number } max - Upper bound of each entry
@param { Integer } toFixed - Number of decimal places
@return { Matrix } - Returns random matrix
```
```javascript
Matrix.getRandomMatrix(3, 4, -10, 10, 2); // 3 x 4 matrix which entries are bounded by -10 and 10 and has 2 decimal places
```
[Table of Content](#api)

#### identity(size)
```
@param { Integer } size - The size of matrix
@return { Matrix } - Returns identity matrix
```
Generate identity matrix with given size.
```javascript
Matrix.identity(2); // 2 x 2 identity matrix
Matrix.identity(10); // 10 x 10 identity matrix
```
[Table of Content](#api)

#### isEqual(A, B, digit = 5)
```
@param { Matirx } A - Any Matrix
@param { Matirx } B - Any Matrix
@param { Integer } digit - Number of significant digits
@return { Boolean } - Returns true if two matrices are considered as same
```
Determine whether two matrices are considered as equal.
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

const B = new Matrix([
  [1, 2],
  [3, 4 + 10e-10],
]);

Matrix.isEqual(A, B); // true

const C = new Matrix([
  [1, 2],
  [3, 4 + 10e-2],
]);

Matrix.isEqual(A, C); // false
```
[Table of Content](#api)

#### row(A, index)
```
@param { Matrix } A - Any matrix
@param { Integer } index - Any valid row index
@return { Matrix } - Returns row of A
```
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

Matrix.row(A, 0); // [[1, 2, 3]]
Matrix.row(A, 1); // [[4, 5, 6]]
```
[Table of Content](#api)

#### submatrix(A, rowsExp, colsExp)
```
@param { Matrix } A - Any matrix
@param { String | Number } rowsExp - Rows expression
@param { String | Number } colsExp - Columns expression
@return { Matrix } - Returns submatrix of A
```
Generate a submatrix of a matrix. Note that both rows and columns expression can be either string or nunmber.
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

Matrix.submatrix(A, 0, 1); // [[2]], row 0 & column 1
Matrix.submatrix(A, '0:1', 1); [[1], [4]], row 0 + row 1 & column 1
Matrix.submatrix(A, '0:1', '0:1'); [[1, 2], [4, 5]], row 0 + row 1 & column 0 + column 1
Matrix.submatrix(A, ':', '1:2'); [[2, 3], [5, 6], [8,9]], all rows && column 1 + column 2
Matrix.submatrix(A, ':', ':'); same with A
```
[Table of Content](#api)

#### toString()
```
@return { Boolean } - Returns the stringified matrix
```
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

A.toString(); // '1 2 3\n4 5 6\n7 8 9'
// 1 2 3
// 4 5 6
// 7 8 9
```
[Table of Content](#api)

#### zero(row, col)
```
@param { Integer } row - Number of rows of the matrix
@param { Integer } col - Number of columns of the matrix
@return { Matrix } - Returns zero matrix
```
Generate a zero matrix
```javascript
Matrix.zero(3, 4); // 3 x 4 zero matrix
Matrix.zero(10, 1); // 10 x 1 zero matrix
```
[Table of Content](#api)

## How to contribute
You are welcome to contribute by:
- Reporting bugs
- Fixing bugs
- Adding new features
- Improving performance
- Improving code style of this library

## Copyright & License
Copyright (C) 2020 Ray Yam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
