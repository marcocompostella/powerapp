
  'use strict';

  angular
  .module('Dashboard', [])
  .controller('dashCtrl', function($scope) {

            $scope.model = {
                basic: 0,
                readonly: 2.5,
                readonly_enables: true,
                minMaxStep:6,
                minMaxStep2:8.75,
                pristine: 3,
                resetable: 4,
                heightWidth: 1.5,
                callbacks: 5,
                custom: 4,
            };

  });
