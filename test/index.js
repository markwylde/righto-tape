const { promisify } = require('util');
const righto = require('righto');

const test = require('../');

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
