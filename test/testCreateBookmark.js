const { createBookmark } = require('../src/createBookmark.js')
const { deepStrictEqual } = require('assert');
const { createTest, testReports } = require('../lib/test.js');

const tests = [
  createTest(
    'when valid url and name is passed',
    (desc) => {
      return deepStrictEqual(
        createBookmark([], { name: 'Google', url: 'abc.com' }),
        [{ name: 'Google', url: 'abc.com' }],
        desc
      );
    }
  ),
];

testReports(tests);