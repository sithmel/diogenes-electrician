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

  it('must start a', function (done) {
    registry.run('a', function (err, res) {
      if (err) return
      assert.equal(res, 'a')
      done()
    })
  })

  it('must start b', function (done) {
    registry.run('b', function (err, res) {
      if (err) return
      assert.equal(res, 'b')
      done()
    })
  })

  it('must start c', function (done) {
    registry.run('c', function (err, res) {
      if (err) return
      assert.equal(res, 'c')
      done()
    })
  })

  it('must start d', function (done) {
    registry.run('d', function (err, res) {
      if (err) return
      assert.equal(res, 'd')
      done()
    })
  })

  it('must stop a', function (done) {
    stopRegistry.run('a', function (err, res) {
      if (err) return
      done()
    })
  })

  it('must stop b', function (done) {
    stopRegistry.run('b', function (err, res) {
      if (err) return
      assert.equal(res, 'b')
      done()
    })
  })

  it('must stop c', function (done) {
    stopRegistry.run('c', function (err, res) {
      if (err) return
      assert.equal(res, 'c')
      done()
    })
  })

  it('must stop d', function (done) {
    stopRegistry.run('d', function (err, res) {
      if (err) return
      assert.equal(res, 'd')
      done()
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
