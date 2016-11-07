
  'use strict';

  angular
  .module('Login', [])
  .controller('loginCtrl', function($scope,$state,AuthService,CommonService) {

  //  var remember = localStorageService.get('remember');
    $scope.login = {
      username: '',
      password: '',
      remember: false,
    };
  /*  if ( remember == 'X') {
      $scope.login.username = localStorageService.get('username');
      $scope.login.password = localStorageService.get('password');
      $scope.login.remember = true;
    }*/

    $scope.loginPost = function() {
      AuthService.login($scope.login).then(function(user) {
          CommonService.setProfile(user);
          $state.go('main');
      }, function(errMsg) {
    /*    var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });*/
      });
    };

        $scope.clear = function() {
          $scope.login = {
            remember: false,
          };
        };


});
