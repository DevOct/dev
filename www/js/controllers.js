angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicSlideBoxDelegate) {

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
	
})

.controller('FeedsController', function($scope, dataFactory) {

	$scope.lala = true;
	$scope.readme = false;
	$scope.feeds = API.storage.get("feeds_"+App_Session.donor_id);
	var donid = App_Session.donor_id;

	dataFactory.service("POST","http://app.octantapp.com/api/msg_feeds",{'donor_id':donid}).
		success(function(data, textStatus, xhr){
			var feeder = {};
			var x = data.feed_id;
			for(i in x){
				feeder[x[i].message_id] = x[i];
			}
			$scope.feeds = feeder;
			API.storage.set("feeds_"+App_Session.donor_id,feeder);
		}).
		error(function() {
			console.log("NO INTERNET");
			// dataFactory._alert("");
			$scope.feeds = API.storage.get("feeds_"+App_Session.donor_id);
		});
		
	$scope.isreadchk = function(message_id){
		// console.log(message_id);
		// console.log($scope.feeds[message_id])
		$scope.feeds[message_id].is_read = true;
	}

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
	var AllFeeds = API.storage.get("feeds_"+App_Session.donor_id);

	if(AllFeeds[msgid]||AllFeeds[msgid]!=undefined){
		$scope.feed = AllFeeds[msgid];
		console.log("foundFeed:",$scope.feed)
		dataFactory.service('PUT','http://app.octantapp.com/api/message_read/123456789',{'msg_id':msgid, 'donor_id':donid}).
			success(function(data, textStatus, xhr) {
				console.log(data);
			}).
			error(function(data, textStatus, xhr) {
				console.log(data);
			});
	}
	else{
		console.log("Not Found");
	}
	// console.log("foundAllFeeds:",$scope.feed,"need",$stateParams.message_id)

})

.controller('ProfileController', function($scope,dataFactory,$ionicPopup,md5) {

	dataFactory._loading(true);
	dataFactory.sec_question().then(function(res){
		$scope.questions = res.data.feed_id;
		console.log($scope.questions);
	}).
	finally(function(){dataFactory._loading(false);})

	// $scope.image64 = null;
	$scope.image = {
		img64: null,
		img: null		
	}

	$scope.pass = {
		pass_1 : null,
		pass_2 : null
	}

	donid = App_Session.donor_id;

	profchk = null;
	dataFactory._loading(true);
	dataFactory.service('POST',"http://app.octantapp.com/api/donor_dg",{donor_id:App_Session.donor_id}).
	then(function(res){
		console.log(res.data);
		$scope.profile = res.data.Users;
		// for(key in d){
		// 	if(d[key].donor_id == donid){
		// 		if(d[key].image)
		// 			d[key].image = String.fromCharCode.apply(null, new Uint16Array(d[key].image));
		// 		$scope.profile = d[key];
		// 	}
		// }
		// $scope.profile.image = API._arrayBufferToBase64($scope.profile.image);
		profchk = $scope.profile;
		if($scope.profile.image)
			$scope.image.img64 = $scope.profile.image;
	},function(res){
		console.log(res);
	}).
	finally(function(){
		dataFactory._loading(false);
	});



	$scope.updateUser = function(){
		dataFactory._loading(true);
		if($scope.image.img64)
			$scope.profile.image = $scope.image.img64;
		if($scope.pass.pass_1!=null){
			console.log("pass Exisits");
			if($scope.pass.pass_2!=null){
				if($scope.pass.pass_1 === $scope.pass.pass_2){
					var newpass = md5.createHash($scope.pass.pass_2 || '');
					$scope.profile.password = newpass;
				}
				else{
					dataFactory._alert("Incorrect Password", "The Password you entered do not match");
					return;
				}
			}
			else{
				dataFactory._alert("Incorrect Password","Re-Enter Password Please!");
				return;
			}
		}
		else{
			
		}

		dataFactory.service('PUT','http://app.octantapp.com/api/donor',$scope.profile).
			success(function (data, status, headers, config) {
				console.log(data);
				console.log('success');
				dataFactory._alert('Data Updated','Your new data has been updated');
			}).
			error(function (data, status, headers, config) {
					console.log('error',data,status);
			}).finally(function(){
				dataFactory._loading(false);
			});
	}


	$scope.swapimage = function(obj){
		console.log($scope.image);
		$scope.image.img64 = 'data:image/jpg;base64,'+$scope.image.img.base64;
		// console.log($scope.image.img64);
	}

	$scope.upFile = function() {
		document.querySelector('input.noshow').click();
	}

	$scope.popup = dataFactory._alert;

	$scope.cont = function(){
		$scope.data = {}
		console.log($scope.pass.pass_1);	

		  // An elaborate, custom popup
		var myPopup = $ionicPopup.show({
		    template: '<input type="password" ng-model="data.pass">',
		    title: 'Enter Old Password',
		    scope: $scope,
		    buttons: [
		      { 
		      	text: 'Cancel',
		      	onTap: function(e){
		      		return "cancel";
		      	}
		      },
		      {
		        text: '<b>Confirm</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          if (!$scope.data.pass) {
		            e.preventDefault();
		          } else {
		            return $scope.data.pass;
		          }
		        }
		      }
		    ]
		});
		myPopup.then(function(res) {
			console.log(res)
			if(res==="cancel")
				return;

			var oldPass = $scope.profile.password,
				match   = md5.createHash(res || '');

			if(match===oldPass)
				$scope.updateUser();
			else
				dataFactory._alert("Incorrect Password","The Password you Entered was Incorrect, try again!");

			console.log(res,oldPass,match);
		});
  	}
})

.controller('orgController', function($scope, dataFactory) {
	$scope.organizaions = API.storage.get('organizaions');
	$scope.checkedOrgs = {};
	clength = 0
	checkProto = {is_checked:false}

	dataFactory._loading(true);
	dataFactory.service('GET','http://app.octantapp.com/api/organization').
	then(function(res){
		ob = res.data.feed_id;
		co = {}
		for(key in ob){
			angular.extend(ob[key], checkProto);
			co[ob[key].org_id] = ob[key];
		}
		$scope.organizaions = co;
		API.storage.set('organizaions',$scope.organizaions);
	}).
	finally(function(){
		dataFactory._loading(false);
	})

	$scope.checkOrg = function(org_id){
		if($scope.organizaions[org_id].is_checked){
			$scope.checkedOrgs[org_id] = $scope.organizaions[org_id];
			clength++;
			console.log($scope.checkedOrgs);
		}
		else{
			delete $scope.checkedOrgs[org_id];
			clength--;
			$scope.organizaions[org_id].is_checked = false;
		}
	}

	$scope.conferOrgs = function(){
		$scope.checkedOrgs;
		$scope.data = []
		// {
		// 	donor_id: App_Session.donor_id,
		// 	org_id: $scope.checkedOrgs[0]
		// }

		for(key in $scope.checkedOrgs){
			var temp = [
				App_Session.donor_id,
				$scope.checkedOrgs[key].org_id
			]
			$scope.data.push(temp);
		}

		if(clength>0){

			console.log($scope.data);

			dataFactory.service('POST','http://app.octantapp.com/api/donor_org',$scope.data).
				then(function(res){
					console.log(res);
				})
			// for(key in $scope.checkedOrgs){
			// 	console.log(key);
			// 	dataFactory._loading(true);
			// 	dataFactory.service('POST','http://app.octantapp.com/api/donor_org',$scope.data).
			// 	then(function(res){
			// 		if(!res.error){
			// 			clength=0;
			// 			succ = true;
			// 			console.log($scope.data,res);
			// 		} else {
			// 			succ = false;
			// 		}
			// 	}).
			// 	finally(function(){
			// 		if($scope.checkedOrgs[key+1])
			// 			$scope.data.org_id = key;

			// 		if(succ && clength==0){
			// 			dataFactory._go('app.home');
			// 		}
			// 	})
			// }
						dataFactory._alert('Successful','organizaions Selected Successfully');
					// dataFactory._loading(false);
			// for(i=0;i<clength;i++){
			// }
		}
		else{
			dataFactory._alert('No Organization Selected','Please Select atleast 1 Organization');
			console.log(clength);
		}
			
	}

})
.controller('forgotController', function($scope, dataFactory, $ionicPopup) {
	$scope.forgot = {
		email: "",
		sec_question: "none",
		sec_answer: ""
	}

	dataFactory._loading(true);
	dataFactory.sec_question().then(function(res){
		$scope.questions = res.data.feed_id;
		console.log($scope.questions);
	}).
	finally(function(){dataFactory._loading(false);})

	$scope.forgotsub = function(){
		qCheck = false;
		for(key in $scope.questions){
			if($scope.questions[key].question == $scope.forgot.sec_question){
				qCheck = true;
				break;
			}
		}
		if(qCheck){
			if($scope.forgot.sec_answer.length>6){
				var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    		if(re.test($scope.forgot.email)){
					dataFactory._loading(true);
	    			dataFactory.service('POST','http://app.octantapp.com/api/reset_pswrd',$scope.forgot).
	    				success(function(data, textStatus, xhr){
	    					$scope.getPass().then(function(d){
	    						if(d==false)
	    							return;

	    						$scope.data.donor_id = data.donor_id;
	    						console.log(d);

	    						dataFactory.service('PUT','http://app.octantapp.com/api/reset_pswrd_upd',$scope.data).
	    						then(function(res){
	    							// console.log(res);
	    							dataFactory._alert('Updated Successfully');
	    						})
	    					});
	    					// dataFactory.service('PUT','http://app.octantapp.com/api/reset_pswrd_upd',$scope.data)
	    				}).
	    				error(function(status){
	    					console.log(status);
	    				}).finally(function(){dataFactory._loading(false);})
	    		}
	    		else{
	    			dataFactory._alert("Invalid Entry","Please input a valid Email");
	    			return;
	    		}
	    	}
			else{
				dataFactory._alert("Invalid Entry","Answer Length too short, ("+$scope.forgot.sec_answer.length+") characters");
				return;
			}
		} else {
			dataFactory._alert("Invalid Entry","Please Select a Question from the dropdown");
			return;
		}
	}


	$scope.getPass = function(){
		$scope.data = {}
		return myPopup = $ionicPopup.show({
		    template: '<input type="password" ng-model="data.password"><span class="err"></span>',
		    title: 'Match Found',
		    subTitle: 'Enter New Password',
		    scope: $scope,
		    buttons: [
		      { 
		      	text: 'Cancel',
		      	onTap: function(e){
		      		return false;
		      	}
		      },
		      {
		        text: '<b>Confirm</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          if (!$scope.data.password || ($scope.data.password.length<8)) {
		          	document.querySelector('span.err').innerHTML = 'Password Too Short';
		            e.preventDefault();
		          } else {
		            return $scope.data.password;
		          }
		        }
		      }
		    ]
		});
	}
})

.controller('tncController', function($scope, dataFactory) {
	k = null;

	head = null;
	body = [];
	$scope.terms = API.storage.get("terms");

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

.controller('privacyController', function($scope, dataFactory) {
	k = null;

	head = null;
	body = [];
	$scope.privacy = API.storage.get("privacy");

	dataFactory.service('GET',"http://app.octantapp.com/api/pr/oct5678093672").
		then(function(res){
			k = res.data.tc_id;
			privacy = [];
			console.log(k);
			for (var i = 0; i < k.length; i++) {

				console.log(k[i]);

				l = document.createElement('div');
				l.innerHTML = k[i].privacy_terms;

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
				privacy[i] = {head,body};
				body = [];
			};
			API.storage.set('privacy',privacy);
			console.log(privacy);
			$scope.privacy = privacy;

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

.controller('LoginController', function($scope, md5, dataFactory, $cordovaGeolocation) {
	$scope.user = {
		email : null,
		password : null,
		latitude: null,
		longitude: null
	}
	$scope.pass = "";

	dataFactory._coordinates().
	then(function (position) {
	    $scope.user.latitude  = position.coords.latitude;
	    $scope.user.longitude = position.coords.longitude;
    })

	$scope.$on('service.login', function(){
		$scope.loginUserData = API.storage.get("login");
		console.log($scope.loginUserData);
	});

	$scope.login = function(){
		dataFactory._loading(true);
		$scope.user.password = md5.createHash($scope.user.pass || '');
		// console.log($scope.user);
		dataFactory.service('POST',"http://app.octantapp.com/api/userlogin/123456789",
			$scope.user).
			then(function(res){
				var uid = res.data.Sucess;
				// console.log(uid)
				if(uid != "false"){
					// console.log(uid);
					App_Session.donor_id = uid.donor_id;
					API.storage.set('donorId',uid.donor_id);
					API.storage.set('donorName',uid.first_name+" "+uid.last_name);
					API.storage.set('donorImage',uid.image);
					$scope.updateSession();
					dataFactory._go('app.home');
				}
				else{
					dataFactory._alert("Error","Cannot Sign in with the given credentials");
					console.log(uid);
					return;
				}
			},function(res){
				console.log(res);
			}).finally(function(){
				dataFactory._loading(false);
			});
	}

//
})

.controller('SignupController', function($scope, $http, $state, dataFactory) {
	$scope.newuser = {
		"image"				: null,
		"donor_id"			: null,
		"email"				: null,
		"password"			: null,
		"first_name"		: null,
		"last_name"			: null,
		"zip"				: null,
		"image"				: null,
		"salutation"		: null,
		"address_1"			: null,
		"address_2"			: null,
		"city"				: null,
		"state"				: null,
		"cellphone"			: null,
		"employer"			: null,
		"position"			: null,
		"is_terms_accepted"	: false,
		"t_c_timestamp"		: null
	}

	var authFlags = {
		"email"				: "Email",
		"password"			: "Password",
		"first_name"		: "First Name",
		"last_name"			: "Last Name",
		"zip"				: "Zip Code",
		"is_terms_accepted"	: "Terms & Conditions",
	}


	$scope.signup = function(ev) {
		var error = "";
		var errorFlag = false;

		document.getElementById('signup').disabled = true;

		for(key in authFlags){
			if($scope.newuser[key]==null||!$scope.newuser[key]){
				error += "-" + authFlags[key] + "<br/>";
				errorFlag = true;
			}
		}
		document.getElementById('signup').disabled = false;
		if(errorFlag){
			dataFactory._alert("Incomplete Form","Please Complete the form <br/>"+error);
			return;
		}
		else{
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		if(!re.test($scope.newuser.email)){
    			dataFactory._alert("Incomplete Form","Invalid Email");
    			return;
    		}
    		if($scope.newuser.password.length<=8){
    			dataFactory._alert("Incomplete Form","Password Too Short");
    			return;
    		}
		}

		dataFactory._loading(true);

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
				API.storage.set('donorId',data.donor_id);
				API.storage.set('donorName',data.donor_first_name+" "+data.donor_last_name);

			}).
			error(function (data, status, headers, config) {
				dataFactory._loading(false);
				dataFactory._alert("Success","User Creation Failed!");
				console.log('error');
			}).
			then(function(){
				$scope.updateSession();
				dataFactory._loading(false);
				dataFactory._alert("Success","User Creation successful");
				dataFactory._go('app.org');
				document.getElementById('signup').disabled = true;
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

.controller('MessagesController', function($scope, dataFactory) {

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

.factory('dataFactory', function($http, $rootScope, $ionicPopup, $ionicLoading, $state, $cordovaGeolocation) {

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

		},
		_loading: function(flag){
			if(flag){
				$ionicLoading.show({
			      template: 'Loading...'
			    });
			}
			else
			if(!flag){
				$ionicLoading.hide();
			}
		},
		_go: function(str){
			$state.go(str);
		},
		_coordinates: function(){

			var posOptions = {timeout: 10000, enableHighAccuracy: true};
			return $cordovaGeolocation.getCurrentPosition(posOptions);
		},
		sec_question: function(){
		    return this.service('GET','http://app.octantapp.com/api/sec_quest')
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
