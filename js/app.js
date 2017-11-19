'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Products', []);
angular.module('ContentProducts', []);
angular.module('Cart', []);
angular.module('CheckOut', []);
angular.module('Orders', []);

angular.module('myapp', [
    'Authentication',
    'Home', 'Products', 'Cart', 'ContentProducts', 'CheckOut',
	'Orders',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'usercontroller',
            templateUrl: 'modules/authentication/views/login.html'
        })

        .when('/Reset', {
            controller: 'resetUserController',
            templateUrl: 'modules/authentication/views/login.html'
        })

		.when('/Recovery', {
            controller: 'recoveryUserController',
            templateUrl: 'modules/authentication/views/recovery.html'
        })
		
		.when('/Create', {
            controller: 'usersController',
            templateUrl: 'modules/authentication/views/create.html'
        })
		
		.when('/RestoreAccount', {
            controller: 'restoreAccountController',
            templateUrl: 'modules/authentication/views/restoreAccount.html'
        })
		
		.when('/Content', {
            controller: 'productsController',
            templateUrl: 'modules/products/views/content.html'
        })
		
		.when('/ContentProducts', {
            controller: 'controller_ContentProduct',
            templateUrl: 'modules/products/views/contentProduct.html'
        })
		
		.when('/ContentCart', {
            controller: 'controllerCart',
            templateUrl: 'modules/cart/views/contentCart.html'
        })
		
		.when('/ContentCheckOut', {
            controller: 'ControllerCheckOut',
            templateUrl: 'modules/checkout/views/contentCheckOut.html'
        })
		
		.when('/ContentOrders', {
            controller: 'ControllerOrders',
            templateUrl: 'modules/ordenes/views/contentOrder.html'
        })
		
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
		
		.otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        var UserLogged=undefined;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common.Authorization = undefined;
            UserLogged = $rootScope.globals.currentUser.username;
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
			//$http.defaults.headers.common['User'] = $rootScope.globals.currentUser.username; // jshint ignore:line
		}
		
        //validate User
       //console.log("valida User APP.JS:",$rootScope.globals);
		if( UserLogged === undefined){
				$rootScope.globals ={};
                $cookieStore.remove('globals');
				$rootScope.auth = false;
		}
        
		$rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && 
				$location.path() !== '/Recovery' && 
				$location.path() !== '/Create' && 
				$location.path() !== '/RestoreAccount' && 
				$location.path() !== '/Content' && 
				$location.path() !== '/ContentProducts' && 
				$location.path() !== '/ContentCart' &&
				$location.path() !== '/ContentCheckOut' &&
				!$rootScope.globals.currentUser) {
				
                $rootScope.auth = false;
                $rootScope.username = undefined;
				$location.path('/login');
            }
        });
    }]);
	

	// --------------- TEXTSEARCH --------------------
angular.module('myapp')
.controller("headercontroller", function($scope){  
      $scope.countryList = [  
           "Televisor 32 Pulg - Sony", "Televisor 40 Pulg - Sony", "Televisor 50 Pulg - Lg", "Televisor 50 Pulg - Panasonic"  
      ];  
      $scope.complete = function(string){  
           $scope.hidethis = false;  
           var output = [];  
		   if(string != ""){
				angular.forEach($scope.countryList, function(country){  
                if(country.toLowerCase().indexOf(string.toLowerCase()) >= 0)  
                {  
                     output.push(country);  
                }  
             }); 
		   }
            
		   
		   $scope.filterCountry = output;  
      }  
      $scope.fillTextbox = function(string){  
           $scope.country = string;  
           $scope.hidethis = true;  
      }  
 });
 
 
 // angular.module('myapp')
 // .controller('PaginationDemoCtrl', function ($scope, $log) {
  // $scope.totalItems = 64;
  // $scope.currentPage = 4;

  // $scope.setPage = function (pageNo) {
    // $scope.currentPage = pageNo;
  // };

  // $scope.pageChanged = function() {
    // $log.log('Page changed to: ' + $scope.currentPage);
  // };

  // $scope.maxSize = 5;
  // $scope.bigTotalItems = 175;
  // $scope.bigCurrentPage = 1;
// });
