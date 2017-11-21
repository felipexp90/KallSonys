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
                    $scope.error = true;
                    $scope.errorMsj = "Error al consultar.";
                });
            };
        }

        $scope.detalle = function (idOrden) {
            console.log(idOrden);
        };
}]);