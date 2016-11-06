'use strict';

/**
 * @ngdoc service
 * @name powerappApp.cordova
 * @description
 * # cordova
 * Factory in the powerappApp.
 */
angular.module('powerApp')
  .factory('cordova', function ($q) {
/*
  // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
	*/

  var d = $q.defer(),
  resolved = false;
	var self = this;
  this.ready = d.promise;
  document.addEventListener('deviceready', function () {
    resolved = true;
    d.resolve({});
  });

// Check to make sure we didn't miss the
// event (just in case)
  setTimeout(function () {
      if (!resolved) {
          if (true) d.resolve({});
      }
  }, 3000);

// Public API here
  return this;
});
