/* eslint-env node, mocha */
var utils = require('../src/utils')
var assert = require('chai').assert
var getComponents = require('./get-components')

describe('startMethod', function () {
  it('must works with empty dependsOn', function (done) {
    var components = getComponents()
    var start = utils.startMethod(components.a)
    start({}, function (err, res) {
      if (err) return
      assert.equal(res, 'a')
      done()
    })
  })

  it('must works without dependsOn', function (done) {
    var components = getComponents()
    var start = utils.startMethod(components.b)
    start({}, function (err, res) {
      if (err) return
      assert.equal(res, 'b')
      done()
    })
  })

  it('must works with dependsOn', function (done) {
    var components = getComponents()
    var start = utils.startMethod(components.c)
    start({a: 'a', b: 'b'}, function (err, res) {
      if (err) return
      assert.equal(res, 'c')
      done()
    })
  })

  it('must works with dependsOn (extra unused field)', function (done) {
    var components = getComponents()
    var start = utils.startMethod(components.d)
    start({a: 'a', b: 'b', z: 'z', c: 'c'}, function (err, res) {
      if (err) return
      assert.equal(res, 'd')
      done()
    })
  })
})

describe('stopMethod', function () {
  it('must works with empty dependsOn', function (done) {
    var components = getComponents()
    var stop = utils.stopMethod(components.a)
    stop({d: 'd', c: 'c'}, function (err, res) {
      if (err) return
      done()
    })
  })

  it('must works without dependsOn', function (done) {
    var components = getComponents()
    var stop = utils.stopMethod(components.b)
    stop({d: 'd', c: 'c'}, function (err, res) {
      if (err) return
      assert.equal(res, 'b')
      done()
    })
  })

  it('must works with dependsOn', function (done) {
    var components = getComponents()
    var stop = utils.stopMethod(components.c)
    stop({d: 'd'}, function (err, res) {
      if (err) return
      assert.equal(res, 'c')
      done()
    })
  })

  it('must works with dependsOn (extra unused field)', function (done) {
    var components = getComponents()
    var stop = utils.stopMethod(components.d)
    stop({}, function (err, res) {
      if (err) return
      assert.equal(res, 'd')
      done()
    })
  })
})

describe('invertedDeps', function () {
  it('must works with empty dependsOn', function () {
    var components = getComponents()
    var deps = utils.invertedDeps('a', components)
    assert.deepEqual(deps, ['d', 'c'])
  })

  it('must works without dependsOn', function () {
    var components = getComponents()
    var deps = utils.invertedDeps('b', components)
    assert.deepEqual(deps, ['d', 'c'])
  })

  it('must works with dependsOn', function () {
    var components = getComponents()
    var deps = utils.invertedDeps('c', components)
    assert.deepEqual(deps, ['d'])
  })

  it('must works with dependsOn (extra unused field 2)', function () {
    var components = getComponents()
    var deps = utils.invertedDeps('d', components)
    assert.deepEqual(deps, [])
  })
})
