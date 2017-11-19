'use strict';

//var app = angular.module("Orders",['ui.bootstrap']);
angular.module("Orders",[])
.controller('ControllerOrders',
    ['$scope','$rootScope','$http',
    function ($scope,$rootScope,$http) {

    console.log("Orders:",$rootScope.globals);
    
}]);