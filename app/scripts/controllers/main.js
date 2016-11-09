  'use strict';

  angular
  .module('Main', ['ngRateIt'])
  .controller('mainCtrl', function($scope){  })
  .controller('dashCtrl',['CommonService', DashController]);



  function DashController() {
    var _self = this;
  }
