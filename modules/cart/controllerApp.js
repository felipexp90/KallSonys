'use strict';

angular.module('Cart')
.controller("controllerCart", 
	['$scope', '$location', '$http', 'ShopService',
    function ($scope, $location, $http, ShopService) {
		
	$scope.add = function(producto)
	{
		//alert(producto.total); return;
		var product = {};
		product.id = producto.id;
		product.price = producto.price;
		product.name = producto.name;
		product.category = producto.category;
		product.qty = parseInt(producto.total || 1,10);
		ShopService.add(product);
	}

	/**
	* @desc - elimina un producto del carrito por su id
	*/
	$scope.remove = function(id)
	{
		if(ShopService.remove(id))
		{
			alert("Producto eliminado correctamente");
			return;
		}
		else
		{
			alert("Ha ocurrido un error eliminando el producto, seguramente porqué no existe");
			return;
		}
	}
	
	/**
	* @desc - elimina el contenido del carrito
	*/
	$scope.destroy = function()
	{
		ShopService.destroy();
	}

	/**
	* @desc - redondea el precio que le pasemos con dos decimales
	*/
	$scope.roundCurrency = function(total)
	{
		return total.toFixed(2);
	}

	/**
	* @desc - formulario de paypal preparado para printar
	*/
	$scope.paypalData = function()
	{
		ShopService.dataPayPal(userDataPayPal());
	}

	/**
	* @desc - array de objetos con productos para el ejemplo
	*/
	$scope.productosTienda = 
	[
	{"id": 1, "category": "Detalles", "name": "Campanas", "price": 0.9, "picture": "css/cart/imgs/campanas.jpg"},
	{"id": 2, "category": "Detalles", "name": "Carrito", "price": 1, "picture": "css/cart/imgs/carrito.jpg"},
	{"id": 3, "category": "Detalles", "name": "Carrito con chupetes", "price": 1.2, "picture": "css/cart/imgs/carrito_chupetes.jpg"},
	{"id": 4, "category": "Detalles", "name": "Cesta", "price": 1.6, "picture": "css/cart/imgs/cesta.jpg"},
	{"id": 5, "category": "Detalles", "name": "Mini cesta", "price": 2, "picture": "css/cart/imgs/cestita.jpg"},
	{"id": 6, "category": "Detalles", "name": "Enfermera", "price": 3, "picture": "css/cart/imgs/enfermera.jpg"},
	{"id": 7, "category": "Detalles", "name": "Gatitos", "price": 2.5, "picture": "css/cart/imgs/gatitos.jpg"},
	{"id": 8, "category": "Detalles", "name": "Perritos", "price": 2.5, "picture": "css/cart/imgs/perritos.jpg"},
	{"id": 9, "category": "Detalles", "name": "Profesoras", "price": 2.5, "picture": "css/cart/imgs/profesora.jpg"},
	{"id": 10, "category": "Detalles", "name": "Vestido", "price": 1.8, "picture": "css/cart/imgs/vestido.jpg"},
	{"id": 11, "category": "Detalles", "name": "Otros", "price": 0.5, "picture": "css/cart/imgs/otros.jpg"}
	];			
			
}]);
	


