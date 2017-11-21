'use strict';

//var app = angular.module("Orders",['ui.bootstrap']);
angular.module("Orders",[])
.controller('ControllerOrders',
    ['$scope','$rootScope','$http', 'UserServices',
    function ($scope,$rootScope,$http, UserServices) {

        var result = UserServices.validateUser();
        if (result === true) {
            // Obtener datos del cliente
            $scope.dataLoading = true;
            $http({
                method: 'GET',
                url: 'http://laptop-diego:9092/api/clientes?e_mail=' + $rootScope.username
            }).then(function successCallback(response) {
                $scope.documento = response.data[0].documento; // Datos del cliente
                $scope.dataLoading = false;
                var resultadoConsulta = $scope.consultarOrdenes($scope.documento);
                //$scope.clienteObtenido = true;
            }, function errorCallback(response) {
                $scope.dataLoading = false;
                $scope.error = true;
                $scope.errorMsj = "Error al consultar cliente actual.";
                //console.log("Response Error",response);
            });

            $scope.consultarOrdenes = function (documento) {
                $http({
                    method: 'GET',
                    url: 'http://laptop-diego:9091/api/ordenes?idCliente=' + documento
                }).then(function successCallback(response) {
                    // Manejar resultado
                    $scope.udpShopContent = response.data;
                    $scope.dataLoading = false;
                    console.log($scope.udpShopContent);
                }, function errorCallback(response) {
                    // Manejar error
                    $scope.dataLoading = false;
                    $scope.success = true;
                    $scope.successMsj = "No posee ordenes.";
                });
            };
        }

        /* LocalStorage>>*/
		 
		 /**
		* @desc - redondea el precio que le pasemos con dos decimales
		*/
		$scope.roundCurrency = function(total)
		{
			return total.toFixed(2);
		}

        $scope.detalle = function (idOrden) {
            $scope.OrderContent = [];
            var totalShop = 0;
      
            if(idOrden!= undefined){
                $scope.dataLoading = true;

                $http({
                    method: 'GET',
                    url: 'http://laptop-diego:9091/api/ordenes/'+idOrden+'/detalle'
                }).then(function successCallback(response) {
                    console.log(response);
                    if(response.data.length >0){
                        $scope.OrdersValid=true;
                        angular.forEach(response.data, function (value, key)
                        {
                            //console.log(value.producto.precio * parseInt(value.itemCarrito.cantidad));
                                    $scope.OrderContent.push({
                                     "idProducto" : value.itemCarrito.idProducto,
                                    "cantidad" :  parseInt(value.itemCarrito.cantidad),
                                     "nombre" :value.producto.nombre,
                                     "precio" :value.producto.precio,
                                     "urlImage" : value.producto.urlImage,
                                     "total": value.producto.precio * parseInt(value.itemCarrito.cantidad)
                                    });	

                                    totalShop=totalShop+(value.producto.precio * parseInt(value.itemCarrito.cantidad));
                        });
                        $scope.udpShopTotalPrice = totalShop;
                        //console.log($scope.OrderContent);
                    }else{
                        scope.error = true;
                        $scope.errorMsj = "Orden no existe.";
                    }
                    $scope.dataLoading = false;
                }, function errorCallback(response) {
                    $scope.OrdersValid=false;
                    $scope.dataLoading = false;
                    $scope.error = true;
                    $scope.errorMsj = "Error al consultar la orden.";
                });
            }else{
                scope.error = true;
                $scope.errorMsj = "Orden Invalida.";
            }
      };

      
}]);