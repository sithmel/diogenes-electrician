var main = require('../src');
var assert = require('chai').assert;
var getComponents = require('./get-components');
var Diogenes = require('diogenes');

describe('addElectricComponents', function () {
  var registry, stopRegistry;

  beforeEach(function () {
    var components = getComponents();
    registry = Diogenes.getRegistry();
    stopRegistry = Diogenes.getRegistry();
    main.addElectricComponents(registry, stopRegistry, components)
  });

  it('must start a', function (done) {
    registry.instance({}).run('a', function (err, res) {
      assert.equal(res, 'a');
      done();
    })
  });

  it('must start b', function (done) {
    registry.instance({}).run('b', function (err, res) {
      assert.equal(res, 'b');
      done();
    })
  });

  it('must start c', function (done) {
    registry.instance({}).run('c', function (err, res) {
      assert.equal(res, 'c');
      done();
    })
  });

  it('must start d', function (done) {
    registry.instance({}).run('d', function (err, res) {
      assert.equal(res, 'd');
      done();
    })
  });

  it('must stop a', function (done) {
    stopRegistry.instance({}).run('a', function (err, res) {
      done();
    })
  });

  it('must stop b', function (done) {
    stopRegistry.instance({}).run('b', function (err, res) {
      assert.equal(res, 'b');
      done();
    })
  });

  it('must stop c', function (done) {
    stopRegistry.instance({}).run('c', function (err, res) {
      assert.equal(res, 'c');
      done();
    })
  });

  it('must stop d', function (done) {
    stopRegistry.instance({}).run('d', function (err, res) {
      assert.equal(res, 'd');
      done();
    })
  });

  it('must start d (order)', function (done) {
    registry.instance({}).getExecutionOrder('d', function (err, deps) {
      assert.deepEqual(deps, [ 'a', 'b', 'c', 'd' ]);
      done();
    })
  });

  it('must stop a (order)', function (done) {
    stopRegistry.instance({}).getExecutionOrder('a', function (err, deps) {
      assert.deepEqual(deps, [  'd', 'c', 'a' ]);
      done();
    })
  });
});

describe('system', function () {
  var system;

  beforeEach(function () {
    var components = getComponents();
    system = main.system(components);
  });

  it('must start', function (done) {
    system.start(function () {
      done();
    });
  });

  it('must stop', function (done) {
    system.stop(function () {
      done();
    });
  });
});
