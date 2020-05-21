const righto = require('righto');
const test = require('tape');

const outputOnError = error => { error && console.log(error); };

function runTest (fn) {
  if (fn.constructor.name === 'GeneratorFunction') {
    return function (t) {
      const originalPlan = t.plan
      t.plan = count => originalPlan.call(t, count + 1);
      const generator = righto.iterate(fn);
      const result = righto(generator, t);
      result(outputOnError);
      result(() => {
        t.pass();
      })
    };
  }

  return fn;
}

function rightoTest (name, fn) {
  test(name, runTest(fn));
}

rightoTest.only = function (name, fn) {
  test.only(name, runTest(fn));
};

rightoTest.skip = function (name, fn) {
  test.skip(name, runTest(fn));
};

module.exports = rightoTest;
