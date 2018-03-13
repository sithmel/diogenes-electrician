var utils = require('./utils')
var startMethod = utils.startMethod
var stopMethod = utils.stopMethod
var invertedDeps = utils.invertedDeps
var Diogenes = require('diogenes')

function addElectricComponents (registry, stopRegistry, components) {
  Object.keys(components)
    .forEach(function (name) {
      registry.service(name)
        .dependsOn(components[name].dependsOn || [])
        .provides(startMethod(components[name]))

      stopRegistry.service(name)
        .dependsOn(components[name].dependsOn ? invertedDeps(name, components) : [])
        .provides(stopMethod(components[name]))
    })
}

function system (components) {
  var registry = Diogenes.getRegistry()
  var stopRegistry = Diogenes.getRegistry()
  var names = Object.keys(components)
  addElectricComponents(registry, stopRegistry, components)

  function start (next) {
    registry.run(names, next)
  }

  function stop (next) {
    stopRegistry.run(names, next)
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
