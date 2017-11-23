'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope','$rootScope','$http','$location', 'UserServices',
    function ($scope,$rootScope,$http, $location, UserServices) {
		//Reset Users.
		var result = UserServices.validateUser();
		if(result===true){
			$scope.dataLoading = true;
			
			 $http({
                method: 'GET',
                url: 'http://laptop-diego:9092/api/clientes?e_mail='+ $rootScope.username
            }).then(function successCallback(response) {
				//console.log(response);
					$scope.documento = response.data[0].documento;
					$scope.nombres = response.data[0].nombres;
					$scope.apellidos = response.data[0].apellidos;
					$scope.telefono = response.data[0].telefono;
					$scope.correo_e = response.data[0].correo_e;
					if(response.data[0].datos_tarjeta != undefined){
					$scope.typeCreditCard = response.data[0].datos_tarjeta.tipo;
					$scope.creditCard = response.data[0].datos_tarjeta.numero;	
					}
					 
					$scope.dataLoading = false;
			}, function errorCallback(response) {
				$scope.dataLoading = false;
				$scope.error = true;
				$scope.errorMsj = "No se encontraron resultados.";
				//console.log("Response Error",response);
			});
		}
		
		
		$scope.EditarUser_Click = function () {

			var datosTarjeta ={};
			 if($scope.typeCreditCard!= undefined && $scope.typeCreditCard!= undefined){
				   datosTarjeta={
					   "tipo": $scope.typeCreditCard,
					   "numero": $scope.creditCard
					}	
			}
		   

			if($scope.nombres=== undefined){ 
				$scope.error = true;
				$scope.errorMsj = "El Nombre es invalido.";
			}
			else if($scope.apellidos=== undefined){
				$scope.error = true;
				$scope.errorMsj = "Los Apellidos son invalidos.";
			}
			else if($scope.telefono=== undefined){ 
				$scope.error = true;
				$scope.errorMsj = "El Telefono es invalido.";
			}else{
				$scope.loading = true;
				$scope.error = false;
				$scope.errorMsj = "";
				$http.put("http://laptop-diego:9092/api/clientes", {
							documento: $scope.documento,
							nombres:$scope.nombres,
							apellidos:$scope.apellidos,
							telefono:$scope.telefono,
							correo_e:$scope.correo_e,
							datos_tarjeta : datosTarjeta
					  }).then(function successCallBack(data, status, headers, config) {
						         if(data.data.success == true){
									 $scope.success = true;
									 $scope.successMsj = "Información actualizada correctamente.";
								 }else{
									$scope.error = true;
									$scope.errorMsj = "Ocurrio un error al intentar actualizar, "+data.data.message;
								 }
								 $scope.loading = false;
						}, function errorCallback(data){
							$scope.error = true;
							$scope.errorMsj = data.data.message;
						    $scope.loading = false;
				});

			}
		};
	}]);
	
	

