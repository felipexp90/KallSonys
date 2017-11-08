'use strict';

angular.module('myapp')

.factory('ValidateUser',
    ['$rootScope','$http', 
	function ($rootScope, $http) {
     
	var service = {};
	
		service.ValidateAutentication = function () {
            var user = $http.defaults.headers.common['User'];
			console.log("User= ",user);
			if(user != undefined){
				$rootScope.auth = true;
				$rootScope.username = user;			
			}
        };
		
	return service;		
}])