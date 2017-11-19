'use strict';

//var app = angular.module("Orders",['ui.bootstrap']);
angular.module("Orders",[])
.controller('ControllerOrders',
    ['$scope','$rootScope','$http', 'UserServices',
    function ($scope,$rootScope,$http, UserServices) {
        UserServices.validateUser();
        console.log("Orders:",$rootScope.globals);
    
}]);