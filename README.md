# Matrix.js
A professional, comprehensive and high-performance library for you to manipulate matrices.

## Features
- Professional
- Comprehensive
- High-performance
- Easy to use
- 3000+ Test cases

## Install
```
npm install --save @rayyamhk/matrix
```

## How to use
```
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
- [constructor](#constructorA)
- [Decompositions](#decompositions)
  - [LU](#LUA-optimized)
  - [QR](#QRA)
- [Linear Equations](#linear-equations)
  - [backward](#backwardU-y)
  - [forward](#forwardL-y)
  - [solve](#solveA-y)
- [Operations](#operations)
  - [add](#addA-B)
  - [inverse](#inverseA)
  - [multiply](#multiplyA-B)
  - [pow](#powA-n)
  - [subtract](#subtractA-B)
  - [transpose](#transposeA)
- [Properties](#properties)
  - [cond](#condp)
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
  - [clone](#cloneA)
  - [column](#columnA-index)
  - [diag](#diagvalues)
  - [elementwise](#elementwiseA-cb)
  - [entry](#entryrow-col)
  - [generate](#generaterow-col-cb)
  - [getDiag](#getdiagA)
  - [getRandomMatrix](#getrandommatrixrow-col-min--0-max--1-tofixed--0)
  - [identity](#identitysize)
  - [isEqual](#isequalA-B-digit--5)
  - [row](#rowA-index)
  - [submatrix](#submatrixA-rowsexp-colsexp)
  - [toString](#tostring)
  - [zero](#zerorow-col)

### constructor(A)
```
@param { Array } A - Two dimensional array where A[i][j] represents the i-th row and j-th column of a matrix
@return { Matrix } - Returns instance of Matrix
```
```
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

### Decompositions

#### LU(A, optimized)
```
@param { Matrix } A - Any matrix
@param { Boolean } optimized - Returns [P, LU] if it is true, [P, L, U] if it is false
@return { Array } - Returns the LUP decomposition of matrix
```
Find the LUP decomposition of a matrix, where L is lower triangular matrix which diagonal entries are always 1, U is upper triangular matrix, and P is permutation matrix.
```
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

#### QR(A)
```
@param { Matrix } A - Any matrix
@return { Array } - Returns [Q, R], which is the QR decomposition of A
```
Find the QR decomposition of a matrix using Householder Transform, where Q is orthogonal matrix, R is upper triangular matrix.
```
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

### Linear-Equations

#### backward(U, y)
```
@param { Matrix } U - n x n upper triangular matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Ux = y
```
Solve system of linear equations Ux = y, where U is an upper triangular matrix. If there is no unique solutions, an error is thrown.
```
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

#### forward(L, y)
```
@param { Matrix } L - n x n lower triangular matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Lx = y
```
Solve system of linear equations Lx = y, where L is a lower triangular matrix. If there is no unique solutions, an error is thrown.
```
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

#### solve(A, y)
```
@param { Matrix } A - n x n square matrix
@param { Matrix } y - n x 1 matrix
@return { Matrix } - Returns n x 1 matrix which is the solution of Ax = y
```
Solve system of linear equations Ax = y with LU decomposition. If there is no unique solutions, an error is thrown.
```
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

### Operations

#### add(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that has same size with A
@return { Matrix } - Returns sum of two matrices
```
Find the sum of two matrices.
```
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

#### inverse(A)
```
@param { Matrix } A - Any non-singular matrix
@return { Matrix } - Returns the inverse of A
```
Find the inverse of non-singular matrix using Elementary Row Operations. If the matrix is singular, an error is thrown.
```
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

#### multiply(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that is size-compatible with A
@return { Matrix } - Returns the product of two matrices
```
Find the product of two matrices.
```
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

#### pow(A, n)
```
@param { Matrix } A - Any square matrix
@param { Number } exponent - Any Non-negative integer
@return { Matrix } - Returns the power of A
```
Find the power of any square matrix using recrusive algorithm.
```
const A = new Matrix([
  [2, 0],
  [0, 2],
]);

const Result = Matrix.pow(A, 10); // [[1024, 0], [0, 1024]]
```

#### subtract(A, B)
```
@param { Matrix } A - Any matrix
@param { Matrix } B - Any matrix that has same size with A
@return { Matrix } - Returns difference of two matrices
```
Find the difference of two matrices.
```
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

#### transpose(A)
```
@param { Matrix } A - Any matrix
@return { Matrix } - Returns transpose of A
```
Find the transpose of a matrix.
```
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const T = Matrix.transpose(A); // [[1, 4], [2, 5], [3, 6]]
```

### Properties

#### cond(p)

#### det()

#### eigenvalues()

#### norm(p)

#### nullity()

#### rank()

#### size()

#### trace()

#### Static methods

### Structure

#### isDiagonal(digit = 8)

#### isLowerTriangular(digit = 8)

#### isOrthogonal(digit = 8)

#### isSkewSymmetric(digit = 8)

#### isSquare()

#### isSymmetric(digit = 8)

#### isUpperTriangular(digit = 8)

### Utilities

#### clone(A)

#### column(A, index)

#### diag(values)

#### elementwise(A, cb)

#### entry(row, col)

#### generate(row, col, cb)

#### getDiag(A)

#### getRandomMatrix(row, col, min = 0, max = 1, toFixed = 0)

#### identity(size)

#### isEqual(A, B, digit = 5)

#### row(A, index)

#### submatrix(A, rowsExp, colsExp)

#### toString()

#### zero(row, col)

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
