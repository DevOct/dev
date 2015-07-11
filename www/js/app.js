// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($rootScope,$ionicPlatform,$ionicLoading) {
  $rootScope.$on('loading.show',function(){
    $ionicLoading.show();
  });
  $rootScope.$on('loading.hide',function(){
    $ionicLoading.hide();
  });
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "login.html",
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl'
    })
  .state('facebook', {
    url: "/facebook",
    templateUrl: "templates/signup_facebook.html",
    controller: 'SignupCtrl'
    })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'FeedsController'
        }
      }
    })
    .state('app.feed', {
      url: "/feed/:message_id",
      views: {
        'menuContent': {
          templateUrl: "templates/feed.html",
          controller: 'FeedController'
        }
      }
    })
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

var API = {
  platformCheck : function(){
    return (typeof device !== 'undefined') ? device.platform : '';
  },
  networkCheck: function()
  {
    var noConnection = navigator.connection && navigator.connection.type == Connection.NONE;
    return noConnection;  
  },
  storage:
  {
    get: function(key, skipParse)
    {
      var data = localStorage.getItem(key);

      if (data)
      {
        if (!skipParse)
        {
          data = JSON.parse(data);
        }

        return data;
      }
    },
    set: function(key, value, skipParse)
    {
      console.log(value);
      if (!skipParse)
      {
        value = JSON.stringify(value);
      }

      localStorage.setItem(key, value);
    },
    remove: function(key)
    {
      localStorage.removeItem(key);
    }
  }
};