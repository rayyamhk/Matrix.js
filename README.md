# Matrix.js
A professional, comprehensive and high-performance library for you to manipulate matrices.

## Features
- 6 Categories: [Decompositions](#decompositions), [Linear Equations](#linear-equations), [Operations](#operations), [Properties](#properties), [Structure](#structure) and [Utilities](#utilities)
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
You can find the documentation in the following link:

[https://rayyamhk.github.io/Matrix.js/Matrix.html](https://rayyamhk.github.io/Matrix.js/Matrix.html)

## Examples

### constructor(A)
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

### Decompositions

#### LU(A, optimized)
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

#### QR(A)
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

### Linear-Equations

#### backward(U, y)
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

#### forward(L, y)
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

#### solve(A, y)
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

### Operations

#### add(A, B)
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

#### inverse(A)
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

#### multiply(A, B)
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

#### pow(A, n)
```javascript
const A = new Matrix([
  [2, 0],
  [0, 2],
]);

const Result = Matrix.pow(A, 10); // [[1024, 0], [0, 1024]]
```

#### subtract(A, B)
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

#### transpose(A)
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const T = Matrix.transpose(A); // [[1, 4], [2, 5], [3, 6]]
```

### Properties

#### cond(p = 2)
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

#### det()
```javascript
const A = new Matrix([
  [1, 3, 5, 9],
  [1, 3, 1, 7],
  [4, 3, 9, 7],
  [5, 2, 0, 9],
]);

A.det(); // -376
```

#### eigenvalues()
Note that eigenvalues are instance of Complex. For more details, please check the documentation [here](https://rayyamhk.github.io/Complex.js/)
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

#### norm(p)
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

#### nullity()
```javascript
const A = new Matrix([
  [0, 1, 2],
  [1, 2, 1],
  [2, 7, 8],
]);

A.nullity(); // 1
```

#### rank()
```javascript
const A = new Matrix([
  [0, 1, 2],
  [1, 2, 1],
  [2, 7, 8],
]);

A.rank(); // 2
```

#### size()
```javascript
const A = new Matrix([
  [0, 1, 2, 3],
  [4, 5, 6, 7],
]);

const [row, col] = A.size(); // 2, 4
```

#### trace()
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

A.trace(); // 15
```

### Structure

#### isDiagonal(digit = 8)
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

#### isLowerTriangular(digit = 8)
```javascript
const A = new Matrix([
  [6, 0, 0, 0],
  [1, -5, 0, 0],
  [2, 30, 1, 0],
]);

A.isLowerTriangular(); // true
```

#### isOrthogonal(digit = 8)
```javascript
const Reflection = new Matrix([
  [1, 0],
  [0, -1],
]);

Reflection.isOrthongonal(); // true
```

#### isSkewSymmetric(digit = 8)
```javascript
const A = new Matrix([
  [1, 2, 3, 4],
  [-2, 2, -4, 5],
  [-3, 4, 100, 10],
  [-4, -5, -10, 5],
]);

A.isSkewSymmetric(); // true
```

#### isSquare()
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);
A.isSquare(); // true
```

#### isSymmetric(digit = 8)
```javascript
const A = new Matrix([
  [1, 4, 3],
  [4, 5, 4],
  [3, 4, 5],
]);

A.isSymmetric(); // true
```

#### isUpperTriangular(digit = 8)
```javascript
const A = new Matrix([
  [6, 0, 1, 5],
  [0, -5, 4, 7],
  [0, 0, 1, 2],
]);

A.isUpperTriangular(); // true
```

### Utilities

#### clone(A)
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
]);

Matrix.clone(A); // [[1, 2], [3, 4]]
```

#### column(A, index)
```javascript
const A = new Matrix([
  [1, 2],
  [3, 4],
  [5, 6],
]);

Matrix.column(A, 0); // [[1], [3], [5]]
Matrix.column(A, 1); // [[2], [4], [6]]
```

#### diag(values)
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

#### elementwise(A, cb)
```javascript
Matrix.elementwise(A, (entry) => entry * 2); // element-wise multiplication
Matrix.elementwise(A, (entry) => entry ** 2); // element-wise power
Matrix.elementwise(A, (entry) => entry - 10); // element-wise subtraction
```

#### entry(row, col)
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

#### flatten()
```javascript
const matrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
const myArray = matrix.flatten(); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### fromArray(arr, row, col)
```javascript
const myArray = [1, 2, 3, 4, 5, 6, 7, 8];
const matrix = Matrix.fromArray(myArray, 2, 4); // [[1, 2, 3, 4], [5, 6, 7, 8]]
```

#### generate(row, col, cb)
```javascript
Matrix.generate(3, 3, () => 0); // 3 x 3 zero matrix
Matrix.generate(3, 3, (i, j) => 1 / (i + j + 1)); // 3 x 3 Hilbert matrix
Matrix.generate(3, 3, (i, j) => i >= j ? 1 : 0); // 3 x 3 lower triangular matrix
```

#### getDiag(A)
```javascript
const A = new Matrix([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
]);

Matrix.getDiag(A); // [1, 6]
```

#### getRandomMatrix(row, col, min = 0, max = 1, toFixed = 0)
```javascript
Matrix.getRandomMatrix(3, 4, -10, 10, 2); // 3 x 4 matrix which entries are bounded by -10 and 10 and has 2 decimal places
```

#### identity(size)
```javascript
Matrix.identity(2); // 2 x 2 identity matrix
Matrix.identity(10); // 10 x 10 identity matrix
```

#### isEqual(A, B, digit = 5)
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

#### row(A, index)
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

Matrix.row(A, 0); // [[1, 2, 3]]
Matrix.row(A, 1); // [[4, 5, 6]]
```

#### submatrix(A, rowsExp, colsExp)
```javascript
const A = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

Matrix.submatrix(A, 0, 1); // [[2]], row 0 & column 1
Matrix.submatrix(A, '0:1', 1); // [[1], [4]], row 0 + row 1 & column 1
Matrix.submatrix(A, '0:1', '0:1'); // [[1, 2], [4, 5]], row 0 + row 1 & column 0 + column 1
Matrix.submatrix(A, ':', '1:2'); // [[2, 3], [5, 6], [8,9]], all rows && column 1 + column 2
Matrix.submatrix(A, ':', ':'); // same with A
```

#### toString()
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

#### zero(row, col)
```javascript
Matrix.zero(3, 4); // 3 x 4 zero matrix
Matrix.zero(10, 1); // 10 x 1 zero matrix
```

## How to contribute
You are welcome to contribute by:
- Reporting bugs
- Fixing bugs
- Adding new features
- Improving performance
- Improving code style of this library

## License
MIT
