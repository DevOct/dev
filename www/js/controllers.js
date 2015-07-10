angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.closeMod = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.terms = function() {
    $ionicModal.fromTemplateUrl('templates/terms.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.privacy = function() {
    $ionicModal.fromTemplateUrl('templates/privacy.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
})

.controller('FeedsController', function($scope, $http, $stateParams, $ionicViewService, dataFactory) {
  $ionicViewService.nextViewOptions({
    disableBack: true
  });

  $scope.feeds = [];
  $scope.feeds = [
    // { message_title: 'Reggae', message_id: 1, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    // { message_title: 'Chill', message_id: 2, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    // { message_title: 'Dubstep', message_message_id: 3, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    // { message_title: 'Indie', message_id: 4, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    // { message_title: 'Rap', message_id: 5, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    // { message_title: 'Cowbell', message_id: 6, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
  ];
  k = null;
  
  // var divs = document.getElementsById('.item p');
  // for(i=0;i<divs.length;i++) {
  //   if(divs[i].className == '__content') {
  //     divs[i].innerHTML = divs[i].innerHTML.substring(0,300);
  //   }
  // }

  dataFactory._get("http://app.octantapp.com/api/feed/oct5678093672").
    success(function(data, status, headers, config) {
      console.info("Status: Success ",status);
      k = JSON.parse(data.feed_id);
    }).
    error(function(data, status, headers, config, error) {
      console.log("Status: Error ",status);
      console.log("Error: ",error);
    }).
    then(function(){
      $scope.feeds = k;
    });


})

.controller('FeedCtrl', function($scope, $stateParams) {

})

.controller('ProfileController', function($scope, $stateParams) {

})

.controller('ModalController', function($scope, $stateParams, dataFactory) {
  k = null;

  $scope.terms2;
  $scope.terms = [];
  head = null;
  body = [];

  dataFactory._get("http://app.octantapp.com/api/td/oct5678093672").
    success(function(data, status, headers, config) {
      console.info("Status: Success ",status);
      k = JSON.parse(data.tc_id);
    }).
    error(function(data, status, headers, config, error) {
      console.log("Status: Error ",status);
      console.log("Error: ",error);
    }).
    then(function(){
      $scope.terms2=k;

      for (var i = 0; i < k.length; i++) {

        l = document.createElement('div');
        l.innerHTML = k[i].tc_donor;

        //fetch h1
        var h = l.getElementsByTagName("h1")[0]
        head = h.innerHTML;
        h.remove();

        //fetch everything else in order
        for (var j = 0; j < l.childElementCount; j++) {
          body[j] = {
              id: j.toString(),
              html: l.children[j].outerHTML};
        };
        //mix them together
        $scope.terms[i] = {head,body};
        body = [];
      };

    });

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

})

.controller('LoginCtrl', function($scope, $stateParams) {

})

.controller('SignupCtrl', function($scope, $stateParams) {

  // Triggered in the login modal to close it
})

.run(function($rootScope, $ionicModal) {

  $rootScope.groups = [];
  for (var i=0; i<10; i++) {
    $rootScope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $rootScope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $rootScope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $rootScope.isGroupShown = function(group) {
    return group.show;
  };

})
.factory('dataFactory', function($http) {

  return {
    _get: function(_url,_callback){

        return $http.get(_url);

    }
  }

});
