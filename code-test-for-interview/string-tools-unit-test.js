'use strict';

import StringTools from './string-tools.js';

const stringToolsUnitTest = function*() {
  let args = null;
  let testString = '';
  let method = '';
  let result = '';
  do {
    args = yield;
    if (!args) {
      return console.log('test ends');
    }
    [ testString, method, result ] = args;
    console.assert(new StringTools(testString)[method]() === result, '%s failed', testString);
  } while (args)
};

const test = stringToolsUnitTest();
test.next();

test.next([ 'aabcccbbad', 'consecutiveCharactersFilter', 'aabbbad']);
test.next([ 'aabbbad', 'consecutiveCharactersFilter', 'aaad']);
test.next([ 'aaad', 'consecutiveCharactersFilter', 'd']);
test.next([ 'aabcccbbad', 'recursiveConsecutiveCharactersFilter', 'd']);

test.next([ 'abcccbad', 'consecutiveCharactersReplacer', 'abbbad']);
test.next([ 'abbbad', 'consecutiveCharactersReplacer', 'aaad']);
test.next([ 'aaad', 'consecutiveCharactersReplacer', 'd']);
test.next([ 'abcccbad', 'recursiveConsecutiveCharactersReplacer', 'd']);

test.next([ 'a', 'consecutiveCharactersFilter', 'a']);
test.next([ 'abbbb', 'consecutiveCharactersFilter', 'a']);
test.next([ 'abb', 'consecutiveCharactersFilter', 'abb']);

test.next([ 'azzzz', 'consecutiveCharactersReplacer', 'ay']);
test.next([ 'baaaaa', 'consecutiveCharactersReplacer', 'b']);

test.next();
