'use strict';

angular.module('Cart', ["LocalStorageModule"])
.controller("controllerCart", 
	['$scope', '$location', '$http', 'ShopService', 'localStorageService',
    function ($scope, $location, $http, ShopService, localStorageService) {
	
try{
		var urlcart = "http://laptop-diego:9091/api/shoppingCart/CC80000644/checkout";
		
	/*<< LocalStorage*/
		if(localStorageService.get("Storage-Local-Kallsonys")){
             $scope.todo=localStorageService.get("Storage-Local-Kallsonys");
         }else{
             $scope.todo=[];
         }
		
         $scope.$watchCollection('todo',function(newValue, oldValue){
             localStorageService.set("Storage-Local-Kallsonys",$scope.todo);
         });
		 
		if($scope.todo.length > 0){
				$scope.dataLoading  = true;
				//$scope.todo = [];
				var product = {};
				var dataObj = {};
				var dataObjArray=[];
				var productsView = [];
				var products = [];
				var productsTodo =[];
				var productValue =0;
				var cantidadValue =0;
				var confirmupdate=false;
				var result = {};
				var resultsProd = [];
				var nombre=null;
				var precio=null;
				var disponibilidad=null;
				var urlImage=null;
				var id=null;
				
				//$scope.todo Local storage
				//console.log("$scope.todo-inicial: ",$scope.todo);
								
				angular.forEach($scope.todo, function (value, key)
				{
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					//console.log("productValue:",productValue," cantidadValue:",cantidadValue);
					
					if(productsTodo.length === 0){
						products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
						dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
						productsTodo.push(products);
						dataObjArray.push(dataObj);
						dataObj ={};
						products = [];
						//console.log("--Inicial--productsTodo: ",productsTodo);
					}
					else{
						//console.log("-----------------------");
						//console.log("productValue=",productValue," cantidadValue=",cantidadValue);
						confirmupdate = false;
							angular.forEach(productsTodo, function (value, key)
							{
								//console.log("productsTodo: ",productsTodo);
								//console.log("productId:", value[0].productId, " Cantidad: ",value[0].Cantidad);
								if(productValue===value[0].productId){
									value[0].Cantidad =  value[0].Cantidad + cantidadValue;
									confirmupdate = true;
								}
							});	
							
						if(confirmupdate === false){
							products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
							dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
						productsTodo.push(products);
						dataObjArray.push(dataObj);
						dataObj ={};
						products = [];
						}
					}
					
				});
				
				$scope.todo = productsTodo;
				//console.log("dataObjArray:", dataObjArray);
				//console.log("$scope.todo:", $scope.todo);
				
				/*Trae Información de todos los articulos del carro de compras*/
				$http.post(urlcart, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						//console.log("data.data.items",data.data.items);
					if(data.statusText==="OK"){
						angular.forEach(data.data.items, function (value, key)
						{
							angular.forEach(value, function (value, key)
							{
								if(value.id != undefined){
									result ={
									 "id":value.id,
									 "nombre" :value.nombre,
									 "precio" :value.precio,
									 "disponibilidad" :value.disponibilidad,
									 "urlImage" :value.urlImage
									}
									resultsProd.push(result);
									result ={};
								}	
							});
						});
						//console.log("$scope.todo:",$scope.todo);
						
							angular.forEach($scope.todo, function (value, key)
							{
								var producto = value[0].productId;
								if(value[0].productId === undefined){
										value[0].productId =1;
								}
								if(value[0].Cantidad === undefined){
										value[0].Cantidad =1;
								}
								
								//console.log("A validar resultsProd:",resultsProd);
								for (var i = 0, len = resultsProd.length; i < len; i++) {
										//console.log("producto",producto);
										//console.log("id",resultsProd[i].id);
										if(parseInt(resultsProd[i].id) === parseInt(producto)){
											//console.log("Iguales");
											id = resultsProd[i].id;
											nombre= resultsProd[i].nombre;
											precio= resultsProd[i].precio;
											disponibilidad= resultsProd[i].disponibilidad;
											urlImage= resultsProd[i].urlImage;
											//console.log("id:",id,"nombre:",nombre,"precio:",precio,"disponibilidad:",disponibilidad,"urlImage:",urlImage);
											break;
										}
										
								}
								// angular.forEach(resultsProd, function (value, key)
									// {
										// console.log("--id:",value.id);
										// console.log("productId:", producto);
										// if(parseInt(value.id)==parseInt(producto)){
											// console.log("Iguales");
											// nombre= value.nombre;
											// precio= value.precio;
											// disponibilidad= value.disponibilidad;
											// urlImage= value.urlImage;
											// return;
										// }
										// console.log("nombre:",nombre,"precio:",precio,"disponibilidad:",disponibilidad,"urlImage:",urlImage);
									// });
								
								$scope.udpShopContent.push({
										"id" : value[0].productId,
										"cantidad" :  parseInt(value[0].Cantidad),
										"nombre" : nombre,
										"precio" : precio,
										"disponibilidad" : disponibilidad,
										"urlImage" : urlImage
								});						
							});
							
							//console.log($scope.udpShopContent);
					}
					$scope.dataLoading  = false;
					}, function errorCallback(data){
					 $scope.dataLoading  = false;
                     $scope.error = data.data.message;
					 console.log(data);
				 });
				/*-------------------------*/
				
				
				// console.log($scope.udpShopContent);
		}
	/* LocalStorage >>*/

		

		/**
		* @desc - elimina un producto del carrito por su id
		*/
		$scope.remove = function(id)
		{
			var products = [];
			var productsTodo =[];
			var productValue =0;
			var cantidadValue =0;
			$scope.udpShopContent = [];
			$scope.dataLoading  = true;
			angular.forEach($scope.todo, function (value, key)
				{
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					//console.log("productValue:",productValue," cantidadValue:",cantidadValue);
					
					if(value[0].productId != id){
						products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
						productsTodo.push(products);
						products = [];
					}
				});
			
			$scope.todo = productsTodo;
			
			$http.post(urlcart, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						//console.log("data.data.items",data.data.items);
					if(data.statusText==="OK"){
						angular.forEach(data.data.items, function (value, key)
						{
							angular.forEach(value, function (value, key)
							{
								if(value.id != undefined){
									result ={
									 "id":value.id,
									 "nombre" :value.nombre,
									 "precio" :value.precio,
									 "disponibilidad" :value.disponibilidad,
									 "urlImage" :value.urlImage
									}
									resultsProd.push(result);
									result ={};
								}	
							});
						});
						//console.log("$scope.todo:",$scope.todo);
						
							angular.forEach($scope.todo, function (value, key)
							{
								var producto = value[0].productId;
								if(value[0].productId === undefined){
										value[0].productId =1;
								}
								if(value[0].Cantidad === undefined){
										value[0].Cantidad =1;
								}
								
								//console.log("A validar resultsProd:",resultsProd);
								for (var i = 0, len = resultsProd.length; i < len; i++) {
										//console.log("producto",producto);
										//console.log("id",resultsProd[i].id);
										if(parseInt(resultsProd[i].id) === parseInt(producto)){
											//console.log("Iguales");
											id = resultsProd[i].id;
											nombre= resultsProd[i].nombre;
											precio= resultsProd[i].precio;
											disponibilidad= resultsProd[i].disponibilidad;
											urlImage= resultsProd[i].urlImage;
											//console.log("id:",id,"nombre:",nombre,"precio:",precio,"disponibilidad:",disponibilidad,"urlImage:",urlImage);
											break;
										}
										
								}
								// angular.forEach(resultsProd, function (value, key)
									// {
										// console.log("--id:",value.id);
										// console.log("productId:", producto);
										// if(parseInt(value.id)==parseInt(producto)){
											// console.log("Iguales");
											// nombre= value.nombre;
											// precio= value.precio;
											// disponibilidad= value.disponibilidad;
											// urlImage= value.urlImage;
											// return;
										// }
										// console.log("nombre:",nombre,"precio:",precio,"disponibilidad:",disponibilidad,"urlImage:",urlImage);
									// });
								
								$scope.udpShopContent.push({
										"id" : value[0].productId,
										"cantidad" :  parseInt(value[0].Cantidad),
										"nombre" : nombre,
										"precio" : precio,
										"disponibilidad" : disponibilidad,
										"urlImage" : urlImage
								});						
							});
							
							//console.log($scope.udpShopContent);
					}
					$scope.dataLoading  = false;
					}, function errorCallback(data){
					 $scope.dataLoading  = false;
                     $scope.error = data.data.message;
					 console.log(data);
				 });
			
			// angular.forEach($scope.todo, function (value, key)
			// {
					// $scope.udpShopContent.push({
							// "id" : value[0].productId,
							// "cantidad" :  parseInt(value[0].Cantidad)
					// });						
			// });
				
			// if(ShopService.remove(id))
			// {
				// $scope.success=true;
				// $scope.successMsj="Producto eliminado correctamente";
				// return;
			// }
			// else
			// {
				// $scope.success=true;
				// $scope.successMsj="Ha ocurrido un error eliminando el producto, seguramente porqué no existe";
			// }
		}
	
		/**
		* @desc - redondea el precio que le pasemos con dos decimales
		*/
		$scope.roundCurrency = function(total)
		{
			return total.toFixed(2);
		}
			
			
	}
	catch(error)
	{
		$scope.error=true;
		$scope.errorMsj=error.message;
	}
}]);
	


