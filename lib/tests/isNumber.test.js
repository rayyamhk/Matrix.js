const isNumber = require('../util/isNumber');

// Some cases are from https://github.com/jonschlinkert/is-number/blob/master/test.js

describe('should be number', () => {
  const samples = [
    0xff,
    5e3,
    0,
    0.1,
    -0.1,
    -1.1,
    37,
    3.14,
    1,
    1.1,
    10,
    10.1,
    100,
    -100,
    Math.LN2,
    // eslint-disable-next-line radix
    parseInt('012'),
    parseFloat('012'),
    Math.abs(1),
    Math.acos(1),
    Math.asin(1),
    Math.atan(1),
    Math.atan2(1, 2),
    Math.ceil(1),
    Math.cos(1),
    Math.E,
    Math.exp(1),
    Math.floor(1),
    Math.LN10,
    Math.LN2,
    Math.log(1),
    Math.LOG10E,
    Math.LOG2E,
    Math.max(1, 2),
    Math.min(1, 2),
    Math.PI,
    1 ** 2,
    5 ** 5,
    Math.random(1),
    Math.round(1),
    Math.sin(1),
    Math.sqrt(1),
    Math.SQRT1_2,
    Math.SQRT2,
    Math.tan(1),

    Number.MAX_VALUE,
    Number.MIN_VALUE,
    +'',
    +1,
    +3.14,
    +37,
    +5,
    +[],
    +false,
    +Math.LN2,
    +true,
    +null,
    +new Date(),
  ];

  samples.forEach((sample) => {
    it(`${sample} is a number`, () => {
      expect.hasAssertions();
      expect(isNumber(sample)).toBe(true);
    });
  });
});

describe('should be non-number', () => {
  const samples = [
    '0.1',
    '-0.1',
    '-1.1',
    '0',
    '012',
    '0xff',
    '1',
    '1.1',
    '10',
    '10.10',
    '100',
    '5e3',
    '   56\r\n  ',
    '   ', // issue#3
    '\r\n\t', // issue#3
    '0.0',
    '0x0',
    '0e+5',
    '000',
    '0.0e-5',
    '0.0E5',
    '',
    '',
    '3a',
    'abc',
    'false',
    'null',
    'true',
    'undefined',
    +'abc',
    +/foo/,
    +[1, 2, 4],
    +Infinity,
    +Math.sin,
    +NaN,
    +undefined,
    +{ a: 1 },
    +{},
    /foo/,
    [1, 2, 3],
    [1],
    [],
    true,
    false,
    +function x() {},
    function x() {},
    Infinity,
    -Infinity,
    Math.sin,
    NaN,
    new Date(),
    null,
    undefined,
    {},
  ];

  samples.forEach((sample) => {
    it(`${sample} is not a number`, () => {
      expect.hasAssertions();
      expect(isNumber(sample)).toBe(false);
    });
  });
});
