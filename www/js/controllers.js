angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSlideBoxDelegate) {
	
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	// Form data for the login modal

	// $scope.$on('tab.shown', function() {

	//     $state.go('tabs.contact');
			
	// });

	// Triggered in the login modal to close it
	// $scope.closeLogin = function() {
	//   $scope.modal.hide();
	// };

	// // Open the login modal
	// $scope.login = function() {
	//   $scope.modal.show();
	// };

	// // Perform the login action when the user submits the login form
	// $scope.doLogin = function() {
	//   console.log('Doing login', $scope.loginData);

	//   // Simulate a login delay. Remove this and replace with your login
	//   // code if using a login system
	//   $timeout(function() {
	//     $scope.closeLogin();
	//   }, 1000);
	// };

	// var maxSlides = 5;
	// var slideCounter = 2;

	// $scope.data = {};
	// $scope.data.slides = [
	// 		{
	// 				title : "American Red Cross",
	// 				data  : "Donations for People",
	// 				image : "http://www.clipartbest.com/cliparts/ace/ong/aceongEoi.png"
	// 		},
	// 		{
	// 				title : "Circle Trust",
	// 				data  : "For Truth",
	// 				image : "http://www.scientiamobile.com/page/wp-content/themes/ScientiaMobile.com-Wordpress/img/scientiamobile_circle.png"
	// 		}
	// ];

	$ionicSlideBoxDelegate.update();
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
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

.controller('FeedsController', function($scope, dataFactory) {

	$scope.lala = true;
	$scope.readme = false;
	$scope.feeds = API.storage.get("feeds");
	var donid = App_Session.donor_id;

	dataFactory.service("POST","http://app.octantapp.com/api/msg_feeds",{'donor_id':donid}).
		success(function(data, textStatus, xhr){
			var feeder = {};
			var x = data.feed_id;
			for(i in x){
				feeder[x[i].message_id] = x[i];
			}
			API.storage.set("feeds",feeder);
		});

	$scope.platforms = function(id){
		CS = "";
		switch(id){
			case 3:
				CS = "ion\-social\-facebook";
				break;
			case 4:
				CS = "ion\-social\-twitter";
				break;
			case 5:
				CS = "ion\-android\-mail";
				break;
			default:
				break;
		}
		return CS;
	}

	// $scope.feeds = [
	// 	{ message_title: 'Reggae', message_id: 1, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Chill', message_id: 2, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Dubstep', message_message_id: 3, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Indie', message_id: 4, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Rap', message_id: 5, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Cowbell', message_id: 6, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
	// ];

})

.controller('FeedController', function($scope, $stateParams, dataFactory) {
	//alert($stateParams.feedid);
	var msgid = $stateParams.message_id;
	var donid = App_Session.donor_id;
	$scope.feed = null;
	var AllFeeds = API.storage.get("feeds");

	if(AllFeeds[msgid]||AllFeeds[msgid]!=undefined){
		$scope.feed = AllFeeds[msgid];
		console.log("foundFeed:",$scope.feed)
		dataFactory.service('POST','http://app.octantapp.com/api/message_read/123456789',{'msg_id':msgid, 'donor_id':donid}).
			success(function(data, textStatus, xhr) {
				console.log(data);
			});
	}
	else{
		console.log("Not Found");
	}
	// console.log("foundAllFeeds:",$scope.feed,"need",$stateParams.message_id)

})

.controller('ProfileController', function($http,$scope,dataFactory,$ionicHistory) {

	$scope.image64 = null;
	donid = App_Session.donor_id;


	$scope.$on('service.profile', function(){
		users = API.storage.get("profile");
		for(key in users){

		}
	});

	dataFactory.service('GET',"http://app.octantapp.com/api/donor").
	then(function(res){
		d = res.data

		for(key in usr = lu = d.Users){
			if(usr === lu[key].donor_id){
				$scope.profile = lu[key]
				console.log($scope.profile);

				if($scope.profile.image!=null)
					$scope.image64 = "data:image/png;base64, "+API._arrayBufferToBase64($scope.profile.image);
			}
			else
				// console.log(usr , lu[key].donor_id)
			;
		}

		console.log($scope.image64);
	});

	$scope.updateUser = function(){
		if($scope.profile.image.filesize > 5000000)
			dataFactory._alert("Image Size Error","the file is huge");
		else{
			$scope.profile.image = $scope.profile.image.base64;
			console.log($scope.profile);
			$http({ method: 'Put', url: ' http://app.octantapp.com/api/donor', data: $scope.profile }).
				success(function (data, status, headers, config) {
					console.log(data);
					console.log('success');
					dataFactory._alert('Data Updated','Your new data has been updated');
				}).
				error(function (data, status, headers, config) {
						console.log('error',data,status);
				});
		}
	}

	$scope.upFile = function() {
		if($scope.profile.image!=null)
			$scope.image64 = "data:image/png;base64,"+API._arrayBufferToBase64($scope.profile.image);
	}

	$scope.popup = dataFactory._alert;
})

.controller('ModalController', function($scope, dataFactory) {
	k = null;

	head = null;
	body = [];


	$scope.$on('service.terms',function(){
		$scope.terms = API.storage.get("terms");
	});

	dataFactory.service('GET',"http://app.octantapp.com/api/do/oct5678093672").
		then(function(res){
			k = res.data.tc_id;
			terms = [];
			console.log(k);
			for (var i = 0; i < k.length; i++) {

				// console.log(terms);

				l = document.createElement('div');
				l.innerHTML = k[i].tc_donor;

				//fetch h1
				var h = l.getElementsByTagName("h1")[0]
				console.log(h.innerHTML,h);
				head = h.innerHTML;
				h.remove();

				//fetch everything else in order
				for (var j = 0; j < l.childElementCount; j++) {
					body[j] = {
							id: j.toString(),
							html: l.children[j].outerHTML};
				};
				//mix them together
				terms[i] = {head,body};
				body = [];
			};
			$scope.terms = terms;

		})

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

.controller('LoginController', function($scope, md5, $state, dataFactory) {
	$scope.user = {
		email : null,
		password : null,
		pass : null
	}

	$scope.$on('service.login', function(){
		$scope.loginUserData = API.storage.get("login");
		console.log($scope.loginUserData);
	});

	$scope.login = function(){

		dataFactory.service('GET',"http://app.octantapp.com/api/donorauth").
			then(function(res){
				$scope.user.password = md5.createHash($scope.user.pass || '');
				usr = true;
				d=res.data
				for(key in lu = d.Users){
					if($scope.user.email==lu[key].email){
						usr = false;
						console.log(lu[key].password);
						console.log($scope.user.password);
						if($scope.user.password===lu[key].password){
							API.storage.set("loggedIn",lu[key]);
							App_Session.donor_id = lu[key].donor_id;
							dataFactory.service('POST','http://app.octantapp.com/api/userlogin/123456789',{donor_login_info:null, lsol_id: null, donor_id: App_Session.donor_id, timestamp: Date().toString(), location:null})
							$state.go('app.home');
						}
						else{
							dataFactory._alert("Incorrect Credentials","Incorrect Password");
							break;
						}
					}
				}
				if(usr)
					dataFactory._alert("Incorrect Credentials","Cannot find User");
			});
	}

//
})

.controller('SignupController', function($scope, $http, $state, dataFactory) {
	$scope.newuser = {
		"image": null,
		"donor_id": null,
		"email": null,
		"password": null,
		"first_name": null,
		"last_name": null,
		"zip": null,
		"image": null,
		"salutation": null,
		"address_1": null,
		"address_2": null,
		"city": null,
		"state": null,
		"cellphone": null,
		"employer": null,
		"position": null,
		"is_terms_accepted": "n",
		"t_c_timestamp": null
	}


	$scope.signup = function() {
		k = $scope.newuser;
		console.log($scope.newuser);

		$scope.userauth = {
			"donor_authentication_id": null,
			"donor_id": null,
			"email": $scope.newuser.email,
			"password": $scope.newuser.password,
			"save_login_info_app": null
		}

		dataFactory.service('Post', ' http://app.octantapp.com/api/donor', $scope.newuser).
			success(function (data, status, headers, config) {
					console.log(data);
					console.log('success');
			}).
			error(function (data, status, headers, config) {
					console.log('error');
			}).
			then(function(){
				dataFactory._alert("Success","User Creation successful");
			});

		// $http({
		//   method: "post",
		//   url: "",
		//   data: $scope.newuser
		// }).
		// success(
		//   function(req){
		//     console.log(req);
		//     $http({
		//       method: "post",
		//       url: "http://app.octantapp.com/api/donorauth",
		//       data: $scope.userauth
		//     }).
		//     success(function(req){
		//       console.log(req);
		//       dataFactory._alert('User Created','User Creation successful, please sign in to continue');
		//       $state.go('login');
		//     }).
		//     error(function(req){
		//       console.log(req);
		//     });
		// }).
		// error(function(req){
		//     console.log(req,$scope.newuser,$scope.userauth);
		// });
	}                   

	// Triggered in the login modal to close it
})

.controller('EventsController', function($scope) {

	// Triggered in the login modal to close it
})

.controller('MessagesController', function($scope, $http) {

	$scope.lala = true;
	$scope.messages = [];

	$scope.$on('service.messages',function(){
		$scope.messages = API.storage.get("messages");
	});

	dataFactory.service('POST',"http://app.octantapp.com/api/feed/123456789",{'donor_id':App_Session.donor_id}).
	success(function(data){
		console.log(data);
		$scope.messages = data.feed_id;
		API.storage.set("messages",data);
	})

	// dataFactory._get( 
	// 	{ 
	// 		_url:"http://app.octantapp.com/sl/oct5678093672",
	// 		_token: "feeds",
	// 		_tokenID: "feed_id"
	// 	}
	// );

	// $scope.feeds = [
	// 	{ message_title: 'Reggae', message_id: 1, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Chill', message_id: 2, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Dubstep', message_message_id: 3, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Indie', message_id: 4, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Rap', message_id: 5, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	// 	{ message_title: 'Cowbell', message_id: 6, content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
	// ];

})

.controller('DonateController', function($scope,$ionicPopup) {

	$scope.items = [{
		name: '$20'
	}, {
		name: '$30'
	}, {
		name: '$40'
		
	}, {
		name: '$50'
		
	}, {
		name: 'other',
		description: '$738'
		
	}];
	$scope.selectedItem = $scope.items[1];

	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Thankyou!\n For your pledge',
			template: 'It might taste good'
		});
			alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	 };
	// Triggered in the login modal to close it
})

.controller('PledgeController', function($scope,$ionicPopup) {


	$scope.items = [{
		name: '$20'
	}, {
		name: '$30'
	}, {
		name: '$40'
		
	}, {
		name: '$50'
		
	}, {
		name: 'other',
		description: '$738'
		
	}];
	$scope.selectedItem = $scope.items[1];

$scope.showAlert = function() {
		 var alertPopup = $ionicPopup.alert({
			 title: 'Thankyou!\n For your pledge',
			 template: '<ul><li>-Organization: American Red Cross</li><li>-Address: 355 Main Street, 5th Street</li><li>-City: Cambridge</li><li>-State: Massachusetts</li><li>-Zip Code: 02142</li><li>-Tax ID: 00386234</li><li>-Organization Telephone: +1857-939-0068</li></ul>'
		 });
		 alertPopup.then(function(res) {
			 console.log('Thank you for not eating my delicious ice cream cone');
		 });
	 };
	// Triggered in the login modal to close it
})

.run(function($rootScope, $ionicModal, dataFactory) {
	
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

	$rootScope.$on('flag.error.conn',function(){
		dataFactory._alert("No Connection","You Deivce is currently disconnected from the internet. Using Cached Data if available");
	});

})
.factory('_Global', function($ionicLoading){
	return {
		showloading: function(){
			$ionicLoading.show();
		},
		hideloading: function(){
			$ionicLoading.hide();
		}
	}
})

.factory('dataFactory', function($http,$rootScope,$ionicPopup) {

	return {

		service: function(_method, _url, _data){
			if(!_data||_data==undefined)
				data=null;
			return $http({ method: _method, url: _url, data: _data });
		},

		_alert: function(alertHead,alertMessage,alertThen){
				 var alertPopup = $ionicPopup.alert({
					 title: alertHead,
					 template: alertMessage
				 });
				 alertPopup.then(function(res) {
						if(typeof alertThen === 'function')
							alertThen();
				 });

		}
	}

})

.directive('baseImage', ['$window', function ($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var fileObject = {};

      scope.readerOnload = function(e){
        var base64 = _arrayBufferToBase64(e.target.result);
        fileObject.base64 = base64;
        scope.$apply(function(){
          ngModel.$setViewValue(fileObject);
        });
      };

      var reader = new FileReader();
      reader.onload = scope.readerOnload;

      elem.on('change', function() {
        var file = elem[0].files[0];
        fileObject.filetype = file.type;
        fileObject.filename = file.name;
        fileObject.filesize = file.size;
        reader.readAsArrayBuffer(file);
      });

      //http://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
      function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return $window.btoa( binary );
      }
    }
  };
}]);
