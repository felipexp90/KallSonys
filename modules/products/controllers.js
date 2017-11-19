'use strict';

angular.module('Products', ["LocalStorageModule"])
.controller("productsController", 
['$scope', '$http', 'localStorageService','UserServices',
	function($scope, $http, localStorageService, UserServices){
			var valueCategoria;
			var productImageSmallBaseUrl = 'http://laptop-diego:9091/api/ImageSmall/';
			var productImageMediumBaseUrl = 'http://laptop-diego:9091/api/ImageMedium/';
			var productImageLargeBaseUrl = 'http://laptop-diego:9091/api/ImageLarge/';
			$scope.urlProductos = "http://localhost/KallsonysMovil/products.html#/ContentProducts?Id=";
			UserServices.validateUser();
			$scope.dataLoading = true;
			
			 $http({
                method: 'GET',
                url: 'http://laptop-diego:9091/api/categorias'
            }).then(function successCallback(response) {
					//console.log("Response Success",response);
					$scope.categories = response.data;
					$scope.dataLoading = false;
		      }, function errorCallback(response) {
				$scope.dataLoading = false;
				$scope.error = true;
				$scope.errorMsj = "No se encontraron resultados.";
				console.log("Response Error",response);
			});
		
		//Functions
		$scope.GetProductsByCat = function () {
			if($scope.selectedCat != undefined && valueCategoria != $scope.selectedCat){
				
				valueCategoria = $scope.selectedCat;
				//console.log("valueCategoria:",valueCategoria);
				
				var urlService = 'http://laptop-diego:9091/api/producto/buscar?categoria='+$scope.selectedCat.split(' ')[0];
				$scope.productImageSmallBaseUrl = productImageSmallBaseUrl;
				$scope.productImageMediumBaseUrl = productImageMediumBaseUrl;
				$scope.productImageLargeBaseUrl = productImageLargeBaseUrl;
				$scope.dataLoading = true;
				
				
				$http({
                method: 'GET',
                url: urlService
				}).then(function successCallback(response) {
						//console.log("Response Success",response);
						$scope.productos = response.data.productos;
						$scope.dataLoading = false;
				  }, function errorCallback(response) {
					$scope.dataLoading = false;
					$scope.error = true;
					$scope.errorMsj = "No se encontraron resultados.";
					console.log("Response Error",response);
				});
					
			}
		};

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
		 
		$scope.addCar=function(idProduct){
			//console.log("idProduct",idProduct);
			$scope.newAct = [];
			$scope.newAct.push(
				{
					"productId": idProduct,
					"Cantidad": 1
				}
			);
			//console.log("$scope.newAct", $scope.newAct);
            $scope.todo.push($scope.newAct);
            $scope.newAct={};
			$scope.message = "Producto Agregado Correctamente al carrito de compras."
			$scope.addCart = true;
		 };
		 /*LocalStorage >>*/

		
}]);


	


