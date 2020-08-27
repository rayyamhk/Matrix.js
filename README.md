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
@return { Matrix } - Instance of Matrix
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

#### QR(A)

### Linear-Equations

#### backward(U, y)

#### forward(L, y)

#### solve(A, y)

### Operations

#### add(A, B)

#### inverse(A)

#### multiply(A, B)

#### pow(A, n)

#### subtract(A, B)

#### transpose(A)

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
