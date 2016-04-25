diogenes-electrician
====================
This is an adapter for using [electrician](https://github.com/tes/electrician) components in Diogenes.

addElectricComponents
---------------------
It adds a set of electric components to 2 Diogenes registry. The first one can be used to start the services in order, the second one to stop them in th opposite order.
```js
var diogenesElectrician = require('diogenes-electrician');
var Diogenes = require('diogenes');

var registry = Diogenes.getRegistry();
var stopRegistry = Diogenes.getRegistry();
diogenesElectrician.addElectricComponents(registry, stopRegistry, components);
```
Then you can start a component using the diogenes "registry" API:
```js
registry.instance({}).run('componentName', function (err, res) {
  // ...
  done();
});
```
and stop with:
```js
stopRegistry.instance({}).run('componentName', function (err, res) {
  // ...
  done();
});
```

system
------
It emulates the electrician "system" api:
```js
var diogenesElectrician = require('diogenes-electrician');
var system = diogenesElectrician.system(components);

system.start(function () {
  // ...
});
```
and stop:
```js
system.stop(function () {
  // ...
});
```
