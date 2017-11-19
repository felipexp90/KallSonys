var app = angular.module("myapp",['ui.bootstrap']);

 app.controller("headercontroller", function($scope,$http,$location){  
		var productList = [];
		$scope.nombres_elast = [];
		$scope.producto = "";

		$scope.complete = function(producto){
		$http({
        method: 'GET',
        url: "http://laptop-michael:7076/api/producto/buscar/scroll?page=0&items_per_page=10&nombre="+producto
        }).then(function successCallback(response) {
			$scope.nombres_elast = [];
			console.log("response.data ",response.data.productos);
			angular.forEach(response.data.productos, function (value, key){
				$scope.nombres_elast.push(
				{
					"id": value.id,
					"nombre": value.nombre
				});
				
			});
			
			console.log("nombres_elast", $scope.nombres_elast);	
			
			productList = $scope.nombres_elast;
			console.log("productList",productList);
 		});
		}

		$scope.seleccionar = function(producto){
			window.location.href = "http://localhost/KallsonysMovil/products.html#/ContentProducts?Id="+producto.id;
		}

	});

 
 app.controller("SliderPage",function($scope, $http){
	$scope.dataLoading = true;
	$scope.myInterval = 3000;
	$scope.urlProductos = "http://localhost/KallsonysMovil/products.html#/ContentProducts?Id=";
	
	var output = [];
	 $http({
                method: 'GET',
                url: 'http://laptop-diego:9091/api/producto/campanias?estado=ACTIVO&categoria=PRINCIPAL'
            }).then(function successCallback(response) {
				angular.forEach(response.data.campanias, function (value, key)
					{
						output.push(
							{
								"image": value.urlImage,
								"productId": value.productos[0].id
							}
						);
					});
					
					$scope.dataLoading = false;
					$scope.slides = output;

		      }, function errorCallback(response) {
				$scope.dataLoading = false;
				console.log(response);
      });

});

 app.controller("ImagesCampanias",function($scope, $http){
	$scope.dataLoading = true;
	$scope.myInterval = 3000;
	$scope.urlProductos = "http://localhost/KallsonysMovil/products.html#/ContentProducts?Id=";
	
	var campaniasArray = [];
	
	 $http({
                method: 'GET',
                url: 'http://laptop-diego:9091/api/producto/campanias?estado=ACTIVO&categoria=SECUNDARIA'
            }).then(function successCallback(response) {
			//	console.log("response",response);
				angular.forEach(response.data.campanias, function (value, key)
					
					{
						campaniasArray.push(
							{
								"image": value.urlImage,
								"productId": value.productos[0].id
								
							}
						);
					});
					
					
					$scope.dataLoading = false;
					$scope.campanias = campaniasArray;

		      }, function errorCallback(response) {
				$scope.dataLoading = false;
			//	console.log(response);
      	});

	 });


  
 
