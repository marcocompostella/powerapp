function CommonService( $http,$q,API_ENDPOINT) {
  var _self = this;
  _self.user = null;

  var init = function (){
  }

  var getUser = function() {
    return _self.user;
  };

  var setUser = function(u) {
    _self.user = u;
  };

  return {
    init: init,
    setUser: setUser,
    getUser: getUser
  };
};
