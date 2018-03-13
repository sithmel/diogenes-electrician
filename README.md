diogenes-electrician
====================
This is an adapter for using [electrician](https://github.com/tes/electrician) components in Diogenes.

addElectricComponents
---------------------
It adds a set of electric components to 2 Diogenes registry. The first one can be used to start the services in order, the second one to stop them in the opposite order.
```js
var diogenesElectrician = require('diogenes-electrician');
var Diogenes = require('diogenes');

var registry = Diogenes.getRegistry();
var stopRegistry = Diogenes.getRegistry();
// components is an object name->electrician component
diogenesElectrician.addElectricComponents(registry, stopRegistry, components);
```
Then you can start a component using the diogenes "registry" API:
```js
registry.run('componentName', function (err, res) {
  // ...
});
```
and stop with:
```js
stopRegistry.run('componentName', function (err, res) {
  // ...
});
```
If "persist" is true the components are persisted: they are cached forever.

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
