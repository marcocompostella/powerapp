function CommonService( $http,$q,API_ENDPOINT,Upload,localStorageService) {
  var _self = this;
  _self.profile = new Object();;
  _self.weather;

  var init = function (){
    _self.weather =  $q(function(resolve, reject) {
      if(!!navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat : position.coords.latitude,
            lon : position.coords.longitude
          }
          $http.post(API_ENDPOINT.url + '/weather',pos).then(function(result) {
            if (result.data.success) {
              resolve(result.data.weather);
            } else {
              reject();
            }
          });
        },function(e){} ,{timeout:3000});
      }
    });
    _self.movement = $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/getAllMovement').then(function(result) {
          resolve(result.data);
      });
    });
  }

    var getAllMovement = function (query,cB){
      _self.movement.then(function(l) {
        var tot = new Object();
        tot.entrate = tot.uscite = tot.guadagno = 0;

        var list = l.reduce(function(prev, curr) {
          return prev.concat(curr);
        });
        list.forEach(function(x){
          if(x.shkzg == 'H')
            tot.entrate += x.amount;
          else
            tot.uscite += x.amount;
        });
        tot.guadagno = tot.entrate - tot.uscite;


        var list2 = _.map(list, _.clone);
        if (query.filter != "")
          list2 = _.filter(list2, function(element){
                return  element.username.startsWith(query.filter);
              });

        if (query.order == '-nameToLower')
             list2 = _.sortBy(list2, function(element){
                   return  element.username;
                 });

        var pages = Math.ceil (list2.count / query.limit );
        var start = query.limit *  ( query.page - 1);
        var last  = query.page * query.limit ;
        var end   = pages==query.page?list2.length:last;

        var movementList = new Object();
        movementList.count = list2.length;
        movementList.tot = tot;
        movementList.data = list2.slice(start,end);

        cB(movementList);
      }, function(errMsg) {
      });
    }

    var setIngresso = function (l){
      return $http.post(API_ENDPOINT.url + '/setIngresso',{'user': l , 'manual': true})
    }

    var getBackup = function(tab){
      return $http.post(API_ENDPOINT.url + '/getBackup', tab);
    }


    var getPDF = function(val){
      return $http.post(API_ENDPOINT.url + '/getPDF', val);
    }




    var setEntrata = function (entrata){
      return $http.post(API_ENDPOINT.url + '/addMovement',{entrata});
    }

    var uploadFiles = function(file, errFiles) {
      f = file;
      errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: API_ENDPOINT.url + '/uploads',
          data: {file: file}
        });

        file.upload.then(function (response) {
          //$timeout(function () {
          //  file.result = response.data;
          //});
          resolve(response);
        }, function (response) {
          ///  if (response.status > 0)
          //  $scope.errorMsg = response.status + ': ' + response.data;
          reject(response);
        }, function (evt) {
          //  file.progress = Math.min(100, parseInt(100.0 *
          //    evt.loaded / evt.total));
        });
      }
    }

    var getProfile = function() {
      return _self.profile.user;
    };

    var setProfile = function(p) {
      _self.profile.user = p;
    };

    var getWeather = function(cB) {
      _self.weather.then(function(obj) {
        cB(obj);
      }, function(errMsg) {
      });
    };

    return {
      init: init,
      setEntrata: setEntrata,
      getAllMovement: getAllMovement,
      setProfile: setProfile,
      setIngresso: setIngresso,
      getBackup: getBackup,
      getPDF:getPDF,
      upload: uploadFiles,
      getProfile: getProfile,
      getWeather: getWeather
    };
  };
