/* eslint-env node, mocha */
var main = require('../src')
var assert = require('chai').assert
var getComponents = require('./get-components')
var Diogenes = require('diogenes')

describe('addElectricComponents', function () {
  var registry, stopRegistry

  beforeEach(function () {
    var components = getComponents()
    registry = Diogenes.getRegistry()
    stopRegistry = Diogenes.getRegistry()
    main.addElectricComponents(registry, stopRegistry, components)
  })

  it('must start a', function () {
    return registry.run('a')
      .then(function (res) {
        assert.equal(res, 'a')
      })
  })

  it('must start b', function () {
    registry.run('b')
      .then(function (res) {
        assert.equal(res, 'b')
      })
  })

  it('must start c', function () {
    registry.run('c')
      .then(function (res) {
        assert.equal(res, 'c')
      })
  })

  it('must start d', function () {
    registry.run('d')
      .then(function (res) {
        assert.equal(res, 'd')
      })
  })

  it('must stop a', function () {
    stopRegistry.run('a')
  })

  it('must stop b', function () {
    stopRegistry.run('b')
      .then(function (res) {
        assert.equal(res, 'b')
      })
  })

  it('must stop c', function () {
    stopRegistry.run('c')
      .then(function (res) {
        assert.equal(res, 'c')
      })
  })

  it('must stop d', function () {
    stopRegistry.run('d')
      .then(function (res) {
        assert.equal(res, 'd')
      })
  })
})

describe('system', function () {
  var system

  beforeEach(function () {
    var components = getComponents()
    system = main.system(components)
  })

  it('must start', function (done) {
    system.start(function () {
      done()
    })
  })

  it('must stop', function (done) {
    system.stop(function () {
      done()
    })
  })
})
