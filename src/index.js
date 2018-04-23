var utils = require('./utils')
var startMethod = utils.startMethod
var stopMethod = utils.stopMethod
var invertedDeps = utils.invertedDeps
var Diogenes = require('diogenes')
var cacheService = require('diogenes-utils').cacheService
var promisify = require('util').promisify

function addElectricComponents (registry, stopRegistry, components) {
  Object.keys(components)
    .forEach(function (name) {
      registry.service(name)
        .dependsOn(components[name].dependsOn || [])
        // .provides(cacheDecorator(startMethod(components[name])))
        .provides(cacheService({ len: 1 }), promisify, startMethod(components[name]))

      stopRegistry.service(name)
        .dependsOn(components[name].dependsOn ? invertedDeps(name, components) : [])
        .provides(cacheService({ len: 1 }), promisify, stopMethod(components[name]))
    })
}

function system (components) {
  var registryRunner = Diogenes.getRegistryRunner()
  var registry = Diogenes.getRegistry()
  var stopRegistry = Diogenes.getRegistry()
  var names = Object.keys(components)
  addElectricComponents(registry, stopRegistry, components)

  function start (next) {
    registryRunner.run(registry, names, next)
  }

  function stop (next) {
    registryRunner.run(stopRegistry, names, next)
  }

  return {
    start: start,
    stop: stop
  }
}

module.exports = {
  system: system,
  addElectricComponents: addElectricComponents
}
