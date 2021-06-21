| :zap:        I'm now using [basictap](https://github.com/markwylde/basictap) which lets you use use tape, promises or anything else you want   |
|-----------------------------------------|

# righto-tape
[![Build Status](https://travis-ci.org/markwylde/righto-tape.svg?branch=master)](https://travis-ci.org/markwylde/righto-tape)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/righto-tape)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/righto-tape)](https://github.com/markwylde/righto-tape/blob/master/package.json)
[![GitHub](https://img.shields.io/github/license/markwylde/righto-tape)](https://github.com/markwylde/righto-tape/blob/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)

A small wrapper around tape that allows passing a righto/generator into the test function

## Installation
```bash
npm install --save-dev righto-tape
```

## Usage
```javascript
const { promisify } = require('util');
const righto = require('righto');

const test = require('righto-tape');

const sleepCallback = (ms, callback) => setTimeout(callback, ms);
const sleepPromise = promisify(sleepCallback);

test('takes a promise', function * (t) {
  t.plan(1);

  yield sleepPromise(100);

  t.pass();
});

test('takes a righto', function * (t) {
  t.plan(1);

  yield righto(sleepCallback, 100);

  t.pass();
});

test('takes a normal function', function (t) {
  t.plan(1);

  sleepCallback(100, function () {
    t.pass();
  });
});
```
