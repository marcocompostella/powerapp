'use strict';

/**
 * @ngdoc overview
 * @name powerApp
 * @description
 * # powerApp
 *
 * Main module of the application.
*/

  var startApp = angular.module('powerApp', [
    'ui.router',
    'uiRouterStyles',
    'ngAnimate',
    'ngAria',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'LocalStorageModule',
    'ngMdIcons',
    'Login',
    'Main',
    'Dashboard'
    ]);


    startApp
    .constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated'
    })
  .constant('API_ENDPOINT', {
    url: 'http://powerhero.cloudno.de'
  })

    startApp.factory('AuthInterceptor', ['$rootScope','AUTH_EVENTS', '$q',
    AuthInterceptor
  ]);


  startApp.service('AuthService', ['$rootScope','$http', '$q', 'API_ENDPOINT','localStorageService',
    AuthentificationService
  ]);



  startApp.service('CommonService', ['$http', '$q', 'API_ENDPOINT',CommonService ]);


    startApp.directive('camera', camera);


  startApp.controller('appCtrl', [
    'cordova', '$rootScope', '$scope','$mdSidenav', '$mdDialog', '$state',
    'AuthService','CommonService','AUTH_EVENTS',
    '$timeout','$mdToast','$mdBottomSheet',
    AppController
  ]);




  startApp.config(function(
    localStorageServiceProvider,
    $stateProvider, $urlRouterProvider,
    $mdThemingProvider,
    $mdDateLocaleProvider,
    $httpProvider){

      $mdDateLocaleProvider.formatDate = function(date) {
         return moment(date).format('DD-MM-YYYY');
      };

      $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('red');

      $httpProvider.interceptors.push('AuthInterceptor');

      $urlRouterProvider.otherwise('/main');
      $stateProvider
        .state('main', {
          url : '/main',
          data: {css: 'styles/main.css'},
          views: {
            '': {templateUrl : 'views/main.html'},
            'Dashboard@main':{
              templateUrl : 'views/dashboard.html',
              controller  : 'dashCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('login', {
          url : '/login',
          templateUrl : 'views/login.html',
          controller  : 'loginCtrl',
        })
})

    .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
      $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
        if (!AuthService.isAuthenticated()) {
          if (next.name !== 'login' ) {
            event.preventDefault();
              $state.go('login');
          }
        }else {
          //setting back history
        }
      });
    });

    function AuthInterceptor($rootScope, AUTH_EVENTS, $q) {
      return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
          }[response.status], response);
          return $q.reject(response);
        }
      };
    };
