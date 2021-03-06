﻿'use strict';

angular.module('ContentProducts', ["LocalStorageModule"])
.controller("controller_ContentProduct", 
	['$scope', '$location', '$http', 'localStorageService',
    function ($scope, $location, $http, localStorageService) {
			var objsURL = $location.search();
			var productId = objsURL.Id;
			
			var URL = ('http://laptop-diego:9091');
			var productDetailURL = ('http://laptop-diego:9091/api/producto/buscar?id='+productId);

			//console.log("ProductId:",productId);
			//console.log("productDetailURL:",productDetailURL);

			$scope.dataLoading = true;

			$http({
                method: 'GET',
                url: productDetailURL
            }).then(function successCallback(response) {
					//console.log("Response Success",response);
					$scope.productDetail = response.data;
					$scope.dataLoading = false;

					$scope.productUrlImage = (URL+response.data.productos[0].urlImage);
					$scope.productName = (response.data.productos[0].nombre);
					$scope.productDescription = (response.data.productos[0].descripcion);					
					$scope.productPrice = (response.data.productos[0].precio);
					$scope.disponibilidad = (response.data.productos[0].disponibilidad);
					$scope.productId = productId;
					//console.log("urlImage-producto",URL+response.data.productos[0].urlImage);
		
			}, function errorCallback(response) {
				$scope.dataLoading = false;
				$scope.error = true;
				$scope.errorMsj = "No se encontro el producto.";
				console.log("Response Error",response);
			});


		/*<< LocalStorage*/
		if(localStorageService.get("Storage-Local-Kallsonys")){
             $scope.todo=localStorageService.get("Storage-Local-Kallsonys");
         }else{
             $scope.todo=[];
         }
			
		//console.log("localStorage:",$scope.todo);
         $scope.$watchCollection('todo',function(newValue, oldValue){
             localStorageService.set("Storage-Local-Kallsonys",$scope.todo);
         });
		 
		$scope.addAct=function(){
			//console.log(" $scope.todo",$scope.todo);
			if($scope.cantidad===undefined || $scope.cantidad===0){
					$scope.cantidad=1;
				}
			$scope.newAct = [];
			$scope.newAct.push(
				{
					"productId": $scope.productId,
					"Cantidad": $scope.cantidad
				}
			);
			//console.log("$scope.newAct", $scope.newAct);
            $scope.todo.push($scope.newAct);
            $scope.newAct={};
			$scope.message = "Producto Agregado Correctamente al carrito de compras."
			$scope.addCart = true;
		 };
		 
        $scope.clean=function(){
             $scope.todo=[];
        };
		/*LocalStorage >>*/

		}]);

		


