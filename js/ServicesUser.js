'use strict';

angular.module('myapp')

.factory('UserServices',
    ['$rootScope', function ($rootScope) {
        
		return{
			
			validateUser: function() 
			{
                return false;
			}	
			
		};
}])