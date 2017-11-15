'use strict';

angular.module('CheckOut', ["LocalStorageModule"])
.controller("ControllerCheckOut", 
	['$scope', '$location', '$http', 'localStorageService',
    function ($scope, $location, $http, localStorageService) {
try{
		var urlcart = "http://laptop-diego:9091/api/shoppingCart/CC80000644/subtotal";
		var urlcheckout = "http://laptop-diego:9091/api/shoppingCart/CC80000644/checkout";
		var urlpayment = "http://laptop-diego:9091/api/shoppingCart/CC80000644/procesarpago";
		
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
				$scope.udpShopContent =[];
				$scope.udpShopTotalPrice=0;
				$scope.dataLoading  = true;
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
				var personalresult = [];			
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
					//inicia Proceso para validar localstorage, integrar valores duplicados.
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					//console.log("productValue:",productValue," cantidadValue:",cantidadValue);
					
					//si el objeto esta vacio, crea el objeto con funcion de que no permita duplicados.
					if(productsTodo.length === 0){
						products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
						//Arma objeto aparte para asignar a local storage. 
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
						//inicia proceso cuando en el objeto ya exista información.
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
				
				$scope.todo = productsTodo;//productsTodo objeto sin duplicados, se concatena información y se suman cantidades.
				//console.log("dataObjArray:", dataObjArray);
				//console.log("$scope.todo:", $scope.todo);
				
				/*Trae Información de todos los articulos del carro de compras*/
				$http.post(urlcart, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						//console.log("data.data.items",data.data.items);
						if(data.statusText==="OK"){
							//saca información del servicio en el objeto resultsProd.
							$scope.nombres = data.data.orden.cliente.nombres;
							$scope.apellidos= data.data.orden.cliente.apellidos;
							$scope.telefono = data.data.orden.cliente.telefono;
							$scope.correo_e = data.data.orden.cliente.correo_e;
							$scope.calle = data.data.orden.cliente.direcciones[0].calle;
							$scope.ciudad= data.data.orden.cliente.direcciones[0].ciudad;
							$scope.pais= data.data.orden.cliente.direcciones[0].pais;
							$scope.direccion= data.data.orden.cliente.direcciones[0].direccion;
										
							
							angular.forEach(data.data.items, function (value, key)//Datos Producto
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
									
									$scope.udpShopContent.push({
											"id" : value[0].productId,
											"cantidad" :  parseInt(value[0].Cantidad),
											"nombre" : nombre,
											"precio" : precio,
											"disponibilidad" : disponibilidad,
											"urlImage" : urlImage
									});	
									//console.log(precio," - ",parseInt(value[0].Cantidad));
									$scope.udpShopTotalPrice=$scope.udpShopTotalPrice+(parseInt(value[0].Cantidad) * precio);
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
		 /* LocalStorage>>*/
		 
		 /**
		* @desc - redondea el precio que le pasemos con dos decimales
		*/
		$scope.roundCurrency = function(total)
		{
			return total.toFixed(2);
		}
		
		$scope.payment=function(){
			
			var productValue =0;
			var cantidadValue =0;
			var dataObj = {};
			var dataObjArray=[];
			
			$scope.dataLoading  = true;
			$scope.error=false;
			$scope.errorMsj="Error: Por favor verifique los medios de pago.";
				
			if($scope.creditCard!=undefined && $scope.typeCreditCard!=undefined){
				
				angular.forEach($scope.todo, function (value, key)
				{
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					
					dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
					dataObjArray.push(dataObj);
					dataObj ={};
					
				});
				
				console.log("dataObjArray:",dataObjArray);
				
				//
				$http.post(urlcheckout, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						  if(data.statusText==="OK"){
							  console.log("data:",data);
							  
							  
							  $http.post(urlpayment, {
								numeroTarjeta: $scope.creditCard,
								tipoTarjeta: $scope.typeCreditCard,
								direccionEntrega:$scope.calle,
								paisEntrega:$scope.pais,
								ciudadEntrega:$scope.ciudad
								})
								.then(function successCallBack(data, status, headers, config) {
										  if(data.exitoso===true){
											  
											  console.log("data:",data);
											  $location.path('/ContentOrders'); //destino Ordenes.
											  $scope.todo=[];//se reestablece LocalStorage.
											} 
										   $scope.loading = false;
								 }, function errorCallback(data){
									 $scope.error=true;
									 $scope.errorMsj=data.data.mensaje;
									 $scope.loading = false;
								});
							  
							  
						  } 
						  $scope.loading = false;
				 }, function errorCallback(data){
					 $scope.error=true;
                     $scope.errorMsj=data.data.message;
					 $scope.loading = false;
				});
				
				
			}else{
				$scope.dataLoading  = false;
				$scope.error=true;
				$scope.errorMsj="Error: Por favor verifique los medios de pago.";
			}
	
		};
}
catch(error)
	{
		$scope.error=true;
		$scope.errorMsj=error.message;
}		 
}]);