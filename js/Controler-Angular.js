var app = angular.module("myapp",['ui.bootstrap','infinite-scroll']);

 app.controller("headercontroller", function($scope,$http,$location){  
		$scope.nombres_elast = [];
		$scope.producto = "";

		$scope.complete = function(producto){
		$http({
        method: 'GET',
        url: "http://laptop-michael:7076/api/producto/buscar/scroll?page=0&items_per_page=10&nombre="+producto
        }).then(function successCallback(response) {
			$scope.nombres_elast = [];
			angular.forEach(response.data.productos, function (value, key){
				$scope.nombres_elast.push(
				{
					"id": value.id,
					"nombre": value.nombre
				});
				
			});
			
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
 
 app.controller('ProductoController', function($scope, Reddit, $http) {
	$scope.reddit = new Reddit();
	$scope.productImageSmallBaseUrl = 'http://laptop-diego:9091/api/ImageSmall/';
	loadCategorias();
	$scope.onChange = onChange;
	function loadCategorias() {
		$http.get('http://laptop-diego:9091/api/categorias?page=0&size=1000s').success(function(data) {
		  $scope.categorias = data;
		}.bind(this));
	}

	function onChange() {
		$scope.reddit.items = [];
		$scope.reddit.page = 0;
		$scope.reddit.total_pages = 0;
		$scope.reddit.nextPage();
	}
});

// Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
	this.page = 0;
	this.total_pages = 0;
	this.codigoProducto = null;
	this.nombreProducto = null;
	this.descripcion = null;
	this.categoriaSeleccionada = 'Celulares';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

	var url = "http://laptop-michael:7076/api/producto/buscar/scroll?page=" + this.page + '&items_per_page=20';
	if(this.codigoProducto !== null){
		url += '&id=' + this.codigoProducto ;
	}
	if(this.nombreProducto !== null){
		url += '&nombre=' + this.nombreProducto ;
	}
	if(this.descripcion !== null){
		url += '&descripcion=' + this.descripcion ;
	}
	if(this.categoriaSeleccionada !== null){
		url += '&categoria=' + this.categoriaSeleccionada ;
	}
	
	
    $http.get(url).success(function(data) {
      var items = data.productos;
	  this.page = data.page.number + 1;
	  this.total_pages = data.page.total_pages;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i]);
      };
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
});
 
 
