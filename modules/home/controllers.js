'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope','$rootScope','$http',
    function ($scope,$rootScope,$http) {
		
		//validate User
		if($http.defaults.headers.common['User'] != undefined){
				$rootScope.auth = true;
				$rootScope.username = $http.defaults.headers.common['User'];			
			}else{
				$rootScope.auth = false;
			}
			
    }]);
	
	

