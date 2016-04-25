function startMethod(comp) {
  var start = comp.start || function (cb) {cb();};
  var arity = start.length;
  var dependsOn = comp.dependsOn || [];
  return function (cfg, deps, next) {
    var args = dependsOn.map(function (arg) {
      return deps[arg];
    }).slice(0, arity - 1);
    args.push(next);
    start.apply(comp, args);
  }
}

function stopMethod(comp) {
  var stop = comp.stop || function (cb) {cb();};
  return function (cfg, deps, next) {
    stop.call(comp, next);
  }
}

function invertedDeps(name, components) {
  return Object.keys(components)
  .map(function (n) {
    var dependsOn = components[n].dependsOn || [];
    if (dependsOn.indexOf(name) !== -1) {
      return n;
    }
  })
  .filter(function (item) {
    return !!item;
  });
}

module.exports = {
  startMethod: startMethod,
  stopMethod: stopMethod,
  invertedDeps: invertedDeps
};
