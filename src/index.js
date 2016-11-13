var utils = require('./utils');
var startMethod = utils.startMethod;
var stopMethod = utils.stopMethod;
var invertedDeps = utils.invertedDeps;
var Diogenes = require('diogenes');

function addElectricComponents(registry, stopRegistry, components, persist) {
  Object.keys(components)
    .forEach(function (name) {
      var service = registry.service(name)
      .dependsOn(components[name].dependsOn || [])
      .provides(startMethod(components[name]));

      if (persist) {
        service.cache();
      }

      stopRegistry.service(name)
      .dependsOn(components[name].dependsOn ? invertedDeps(name, components) : [])
      .provides(stopMethod(components[name]));
    });
}


function system(components) {
  var registry = Diogenes.getRegistry();
  var stopRegistry = Diogenes.getRegistry();
  var names = Object.keys(components);
  addElectricComponents(registry, stopRegistry, components);

  function start(next) {
    registry.instance({}).run(names, next);
  }

  function stop(next) {
    stopRegistry.instance({}).run(names, next);
  }

  return {
    start: start,
    stop: stop
  };
}

module.exports = {
  system: system,
  addElectricComponents: addElectricComponents
};
