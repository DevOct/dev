angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicSlideBoxDelegate, dataFactory) {

	$scope.$on('$locationChangeStart', function(next, current) { 
		active    = document.querySelector('.__navtabs .active');
				    active.classList.remove('active')
		activated = document.querySelector('.__navtabs .activated');
					activated.classList.add('active')
	});

	$scope.updateSession();
	$scope.data = {}
	dataFactory._loading(true);
	dataFactory.service('POST','http://app.octantapp.com/api/message_count',{donor_id:App_Session.donor_id}).
	then(function(res){
		console.log(res.data['count(*)']);
		$scope.data.unread = {msgs:res.data['count(*)']}
	}).
	finally(function(){
		dataFactory._loading(false);
	})


	ionic.DomUtil.ready(function(){
		active = document.querySelector('active');
		activated = document.querySelector('activated');
	})

	$scope.datify = function(dt,param){
		date = new Date(dt);
		// str = date.toISOString().slice(0, 19).replace('T', ' ')
		switch(param){
			case 'date':
				return date.toLocaleDateString()	;
				break;
			case 'time':
				return date.toLocaleTimeString();
				break;
			default:
				return date.toLocaleString();
				break;
		}
	}

	$ionicSlideBoxDelegate.update();
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
		$rootScope.$broadcast("slideChange");
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
		$rootScope.$broadcast("slideChange");
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
				if(x[i].pic == ""){
					x[i].pic = "img/_octant_logo.png";
				}
				x[i].contentPrev = x[i].content.slice(0,100);
				feeder[x[i].message_id] = x[i];
			}
			$scope.feeds = feeder;
			API.storage.set("feeds_"+App_Session.donor_id,feeder);
			locale = $scope.feeds;

		}).
		error(function() {
			console.log("NO INTERNET");
			// dataFactory._alert("");
			$scope.feeds = API.storage.get("feeds_"+App_Session.donor_id);
			locale = $scope.feeds;
		});

	$scope.isreadchk = function(message_id){
		$scope.feeds[message_id].is_read = true;
		dataFactory.service('PUT','http://app.octantapp.com/api/message_read/123456789',{'msg_id':message_id, 'donor_id':donid}).
			success(function(data, textStatus, xhr) {
				console.log(data);
			}).
			error(function(data, textStatus, xhr) {
				console.log(data);
			});
	}

	$scope.donatetoorg = function(orgid){
		dataFactory._go('app.donate',{'orgid':orgid})
	}

	$scope.platforms = function(id){
		CS = "";
		switch(id){
			case 1:
				CS = "ion\-ionic organizaionsC";
				break;
			case 2:
				CS = "ion\-ionic eventsC";
				break;
			case 3:
				CS = "ion\-social\-facebook";
				break;
			case 4:
				CS = "ion\-social\-twitter";
				break;
			case 5:
				CS = "ion\-ionic msgs";
				break;
			default:
				break;
		}
		return CS;
	}

})

.controller('FeedController', function($scope, $stateParams, dataFactory) {
	//alert($stateParams.feedid);
	var msgid = $stateParams.message_id;
	var donid = App_Session.donor_id;
	$scope.feed = null;
	var AllFeeds = API.storage.get("feeds_"+App_Session.donor_id);

	if(AllFeeds[msgid]||AllFeeds[msgid]!=undefined){
		$scope.feed = AllFeeds[msgid];
		$scope.feed.is_read = true;
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
		pass_2 : null,
		oldPass: null
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
		
		$scope.pass.oldPass = $scope.profile.password;
		console.log($scope.pass.oldPass);
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
				API.storage.set('donorId',$scope.profile.donor_id);
				API.storage.set('donorName',$scope.profile.first_name+" "+$scope.profile.last_name);
				API.storage.set('donorImage',$scope.profile.image);
				$scope.updateSession();
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

			match   = md5.createHash(res || '');

			if(match===$scope.pass.oldPass)
				$scope.updateUser();
			else
				dataFactory._alert("Incorrect Password","The Password you Entered was Incorrect, try again!");

			console.log(res,$scope.pass.oldPass,match);
		});
  	}
})

.controller('orgController', function($scope, dataFactory,$stateParams) {

	$scope.organizaions = null;
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
		con

		dataFactory._loading(true);
		dataFactory.service('POST','http://app.octantapp.com/api/donor_org_get',{donor_id:App_Session.donor_id}).
		then(function(res){
			// console.log(res.data);
			for(key in res.data){
				console.log(res.data[key]);
				$scope.organizaions[res.data[key]].is_checked = true;
				$scope.checkOrg(res.data[key])
				console.log($scope.organizaions);
				console.log($scope.checkedOrgs);

			}
		}).
		finally(function(){
			dataFactory._loading(false);
		})

	},
	function(res){
		dataFactory._alert("No Internet",res.err)
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
			// console.log(k);
			for (var i = 0; i < k.length; i++) {

				// console.log(terms);

				l = document.createElement('div');
				l.innerHTML = k[i].tc_donor;

				//fetch h1
				var h = l.getElementsByTagName("h1")[0]
				// console.log(h.innerHTML,h);
				hd = {"head":h.innerHTML};
				h.remove();

				//fetch everything else in order
				for (var j = 0; j < l.childElementCount; j++) {
					body[j] = {
						id: j.toString(),
						html: l.children[j].outerHTML
					}
				};
				//mix them together
				terms[i] = {"head":hd.head,"body":body};
				console.log(terms[i]);
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
		    console.log(position);
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
				console.log(res.data)
				if(uid != "false"){
					// console.log(uid);
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
		"image"					: null,
		"donor_id"				: null,
		"email"					: null,
		"password"				: null,
		"first_name"			: null,
		"last_name"				: null,
		"zip"					: null,
		"image"					: null,
		"salutation"			: null,
		"address_1"				: null,
		"address_2"				: null,
		"city"					: null,
		"state"					: null,
		"cellphone"				: null,
		"employer"				: null,
		"position"				: null,
		"is_terms_accepted"		: false,
		"t_c_timestamp"			: null,

		"device_type"			: null,
		"device_identification"	: null, 
		"device_os"				: null, 
		"octant_donor_version"	: null, 
		"updated_on"			: null,

		"latitude"				: null,
		"longitude"				: null
	}

	var authFlags = {
		"email"				: "Email",
		"password"			: "Password",
		"first_name"		: "First Name",
		"last_name"			: "Last Name",
		"zip"				: "Zip Code",
		"is_terms_accepted"	: "Terms & Conditions",
	}


	dataFactory._coordinates().
		then(function (position) {
		    $scope.newuser.latitude  = position.coords.latitude;
		    $scope.newuser.longitude = position.coords.longitude;
		    console.log(position);
	    })


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
	}                   

	// Triggered in the login modal to close it
})

.controller('EventsController', function($scope, dataFactory) {

	console.log($scope.datify(0),'date');

	$scope.lala = true;
	$scope.readme = false;
	$scope.events = API.storage.get("event_"+App_Session.donor_id);
	var donid = App_Session.donor_id;

	dataFactory._loading(true);
	dataFactory.service("POST","http://app.octantapp.com/api/msg_feeds",{'donor_id':donid}).
		success(function(data, textStatus, xhr){
			var feeder = {};
			var x = data.feed_id;
			for(i in x){
				if(x[i].msg_type_id==2)
					feeder[x[i].message_id] = x[i];
			}
			$scope.events = feeder;
			API.storage.set("event_"+App_Session.donor_id,feeder);
			console.log($scope.events);
		}).
		error(function() {
			console.log("NO INTERNET");
			$scope.events = API.storage.get("event_"+App_Session.donor_id);
			console.log($scope.events);
		}).
		finally(function(){
			dataFactory._loading(false);
		});
		
	$scope.isreadchk = function(message_id){
		// console.log(message_id);
		// console.log($scope.feeds[message_id])
		$scope.events[message_id].is_read = true;
	}

	$scope.donatetoorg = function(orgid){
		dataFactory._go('app.donate',{'orgid':orgid})
	}

	// Triggered in the login modal to close it
})

.controller('MessagesController', function($scope, dataFactory) {

	$scope.lala = true;
	$scope.readme = false;
	$scope.messages = API.storage.get("msg_"+App_Session.donor_id);
	var donid = App_Session.donor_id;

	dataFactory.service("POST","http://app.octantapp.com/api/msg_feeds",{'donor_id':donid}).
		success(function(data, textStatus, xhr){
			var feeder = {};
			var x = data.feed_id;
			for(i in x){
				console.log(x[i].msg_type_id)
				if(x[i].msg_type_id==1)
					feeder[x[i].message_id] = x[i];
			}
			$scope.messages = feeder;
			API.storage.set("msg_"+App_Session.donor_id,feeder);
			console.log($scope.messages);
		}).
		error(function() {
			console.log("NO INTERNET");
			// dataFactory._alert("");
			$scope.feeds = API.storage.get("msg_"+App_Session.donor_id);
		});
		
	$scope.isreadchk = function(message_id){
		// console.log(message_id);
		// console.log($scope.feeds[message_id])
		$scope.messages[message_id].is_read = true;
	}

	$scope.donatetoorg = function(orgid){
		dataFactory._go('app.donate',{'orgid':orgid})
	}

	$scope.datify = function(dt){
		return new Date(dt).toISOString().slice(0, 19).replace('T', ' ');
		// return dty;
	}

})

.controller('DonateController', function($scope,$ionicSlideBoxDelegate,$ionicPopup,$stateParams,dataFactory) {

	$scope.data = {
		selectedItem:30, 
		amount:30,
		slide: null
	};
	slto = 0

	$scope.slides = []
	$scope.organizaions = {}
	$scope.billing = {}

	dataFactory._loading(true);
	dataFactory.service('GET','http://app.octantapp.com/api/organization').
	then(function(res){
		ob = res.data.feed_id;
		$scope.organizaions = ob
		count = 0;
		console.log(ob);
		for(key in ob){
			count++;
			$scope.slides.push({
				image: ob[key].logo_full,
				org_id: ob[key].org_id,
				title: ob[key].name,
				desc: ob[key].descrip,
				address: ob[key].address_1 + ";" + ob[key].address_2,
				city: ob[key].city,
				zip: ob[key].zip,
				state: ob[key].state,
				tel: "+92 321 9579365",

			});
			if($stateParams.orgid==ob[key].org_id)
				slto = count;
		}
		console.log($scope.slides);
    	$ionicSlideBoxDelegate.update();
    	// console.log(slto);
    		// API.storage.set('organizaions',$scope.organizaions);
	}).
	finally(function(){
    	angular.element(document).ready(function () {
	    	$ionicSlideBoxDelegate.slide(slto);
	    	if(slto>0){
	    		$scope.billing = $scope.slides[slto];
	    		$scope.data.slide = slto;
	    	}
		    else
		    	$scope.billing = {
					image: null,
					org_id: null,
					title: null,
					desc: null,
					address: null,
					city: null,
					zip: null,
					state: null,
					tel: null,
				}

		    // console.log('page loading completed');
		});
		dataFactory._loading(false);
	})

	$scope.dataChanged = function(selectedItem){
		$scope.data.amount = selectedItem;
	}
	$scope.oct_donate = function(){

		if($scope.data.slide>0){
			$scope.showAlert();
			if($scope.data.amount>20){
				
			}
			else{
				dataFactory._alert('Amount Error','Kindly Enter a Number Greater than the Min Amount ($20)');
			}
		}
		console.log($scope.data);
	}

	$scope.slideC = function(index){
		$scope.data.slide = slto;
		if(index>0){
	    	$scope.billing = $scope.slides[index-1];
	    }
	    else
	    	$scope.billing = {
				image: null,
				org_id: null,
				title: null,
				data: null,
				address: null,
				city: null,
				zip: null,
				state: null,
				tel: null
			}
		console.log(index);
	}

})

.controller('PledgeController', function($scope,$ionicSlideBoxDelegate,$ionicPopup,dataFactory,$stateParams) {


	$scope.data = {
		selectedItem:30, 
		amount:30,
		donor_id: App_Session.donor_id,
		org_id: null,
		slide: null
	};
	slto = 0

	$scope.slides = []
	$scope.organizaions = {}
	$scope.billing = {}

	dataFactory._loading(true);
	dataFactory.service('GET','http://app.octantapp.com/api/organization').
	then(function(res){
		ob = res.data.feed_id;
		$scope.organizaions = ob
		count = 0;
		console.log(ob);
		for(key in ob){
			count++;
			$scope.slides.push({
				image: ob[key].logo_full,
				org_id: ob[key].org_id,
				title: ob[key].name,
				desc: ob[key].descrip,
				address: ob[key].address_1 + " " + ob[key].address_2,
				city: ob[key].city,
				zip: ob[key].zip,
				state: ob[key].state,
				tel: "+92 321 9579365",

			});
			if($stateParams.orgid==ob[key].org_id)
				slto = count;
		}
		console.log($scope.slides);
    	$ionicSlideBoxDelegate.update();
    	// console.log(slto);
    		// API.storage.set('organizaions',$scope.organizaions);
	}).
	finally(function(){
    	angular.element(document).ready(function () {
	    	$ionicSlideBoxDelegate.slide(slto);
	    	if(slto>0){
	    		$scope.billing = $scope.slides[slto];
	    		$scope.data.slide = slto;
	    	}
		    else
		    	$scope.billing = {
					image: null,
					org_id: null,
					title: null,
					desc: null,
					address: null,
					city: null,
					zip: null,
					state: null,
					tel: null,
				}

		    // console.log('page loading completed');
		});
		dataFactory._loading(false);
	})

	$scope.dataChanged = function(selectedItem){
		$scope.data.amount = selectedItem;
	}
	$scope.oct_pledge = function(){

		if($scope.data.slide>0){
		$scope.data.org_id= $scope.slides[$scope.data.slide].org_id
			if($scope.data.amount>20){
				dataFactory.service('POST','http://app.octantapp.com/api/pledge',$scope.data).
				then(function(res){
					console.log(res);
					$scope.showAlert();
				})
				
			}
			else{
				dataFactory._alert('Amount Error','Kindly Enter a Number Greater than the Min Amount ($20)');
			}
		}
		else{
			dataFactory._alert('Organization Error','No Organizaions Selected');
		}
		console.log($scope.data);
	}

	$scope.slideC = function(index){
		$scope.data.slide = index;
		if(index>0){
	    	$scope.billing = $scope.slides[index-1];
	    }
	    else
	    	$scope.billing = {
				image: null,
				org_id: null,
				title: null,
				data: null,
				address: null,
				city: null,
				zip: null,
				state: null,
				tel: null
			}
		console.log(index);
	}

	$scope.showAlert = function() {
		x = $scope.billing;
		console.log(x)
		dataFactory._alert('Thankyou!\n For your pledge',
			'<ul><li>-Organization: '+x.title+'</li><li>-Address: '+x.address+'</li><li>-City: '+x.city+'</li><li>-State: '+x.state+'</li><li>-Zip: '+x.zip+'</li><li>-Tel: '+x.tel+'</li></ul>')
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
		_go: function(str,params){
			$state.go(str,params);
		},
		_coordinates: function(){

			var posOptions = {timeout: 10000, enableHighAccuracy: true};
			var gps = $cordovaGeolocation.getCurrentPosition(posOptions);
			console.log(gps);
			return gps
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
