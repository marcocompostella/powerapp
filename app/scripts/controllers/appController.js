'use strict';


  function AppController(cordova,$rootScope,$scope,$mdSidenav,$mdDialog,$state,
    AuthService,CommonService,AUTH_EVENTS,
    $timeout,$mdToast,$mdBottomSheet) {
      var _self = this;

      _self.selectItem   = selectItem;
      _self.toggleList   = toggleMenuList;
      _self.back         = back;

   _self.menuOptions = [];
   cordova.ready.then(function () {
    // alert('Cordova is ready');
   });


      var setAuthView = function(view){
        var obj;
        $scope.isLogged = view.showBar;
        if (view.showBar){
          _self.sidemenu = view.menu.sidemenu;
        }
      };

      var init = function (){
    /*    UserService.init();
        TodoService.init();
        TurnService.init();
        RoomMngService.init();
        SettingService.init();
        SettingService.getBusiness(setBisness);*/
        CommonService.init();
        _self.selected = $state.current
      };

      AuthService.init(setAuthView, init);


      function toggleMenuList() {
        $mdSidenav('left').toggle();
      }

      function back() {
        window.history.back();
      }

      function selectItem ( item ) {
        _self.selected = item;
        $state.go(item.state);
  }

      $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
        AuthService.logout();
        $state.go('login');
    });


    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    this.logout = function(event) {
      AuthService.logout();
      $state.go('login');
    };



  };
