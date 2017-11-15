'use strict';

angular.module('Orders')
.controller('ControllerOrders',
    ['$scope','$rootScope','$http',
    function ($scope,$rootScope,$http) {
		
	// $scope.dataLoading = true;
	// $scope.myInterval = 3000;
	//$scope.urlProductos = "http://localhost/KallsonysMovil/products.html#/ContentProducts?Id=";
	
	var output = [];
	 $http({
                method: 'GET',
                url: 'http://laptop-diego:9091/api/producto/campanias?estado=ACTIVO&categoria=PRINCIPAL'
            }).then(function successCallback(response) {
				console.log("response:",response);

		      }, function errorCallback(response) {
				//$scope.dataLoading = false;
				console.log(response);
      });
}]);