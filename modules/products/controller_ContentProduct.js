﻿'use strict';

angular.module('Products')
.controller("controller_ContentProduct", 
	['$scope', '$location', '$http',
    function ($scope, $location, $http) {
			var objsURL = $location.search();
			var idProduct = objsURL.Id;
			console.log("Id:",idProduct);
			
			
}]);
	


