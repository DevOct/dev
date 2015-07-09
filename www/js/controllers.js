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

.controller('PlaylistsCtrl', function($scope, $http, $stateParams, $ionicViewService) {
  $ionicViewService.nextViewOptions({
    disableBack: true
  });
    var feeds;

  $http.get('http://app.octantapp.com/api/td/oct5678093672').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })

  $scope.organizations = [
    { title: 'Reggae', id: 1, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
    { title: 'Chill', id: 2, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
    { title: 'Dubstep', id: 3, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
    { title: 'Indie', id: 4, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
    { title: 'Rap', id: 5, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
    { title: 'Cowbell', id: 6, details:'lLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('ModalController', function($scope, $stateParams, $http) {
  k = null;
  $http({
    type: 'GET',
    url: "http://app.octantapp.com/api/td/oct5678093672",
    dataType: 'json'
  }).
  success(function(data, status, headers, config) {
    console.log(JSON.parse(data.tc_id));
  }).
  error(function(data, status, headers, config) {
    console.log("Status: Error "+status);
    console.log("Error: ");
  });
  console.log(k)

})

.controller('LoginCtrl', function($scope, $stateParams) {

})

.controller('SignupCtrl', function($scope, $stateParams) {

  // Triggered in the login modal to close it
})

.run(function($rootScope, $ionicModal, staticData) {

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
.factory('staticData', function($http) {
  var termsFac;

  return {
    getTerms: function(){
      return $http.get("data/test.json").then(function(response){
        termsFac = response;
        return termsFac;
      });
    },
  }
});
