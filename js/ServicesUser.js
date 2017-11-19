'use strict';

angular.module('myapp')

.factory('UserServices',
    ['$rootScope', '$cookieStore',
    function ($rootScope, $cookieStore) {
        
        var globals = undefined;
		return{
			
			validateUser: function() 
			{ 
                globals= $cookieStore.get('globals') || {};
                //console.log("globals",globals);
                //console.log("globals.currentUser",globals.currentUser);
                if(globals!= undefined && globals.currentUser!= undefined){
                    $rootScope.auth = true;
                    $rootScope.username = globals.currentUser.username;
                    return true;
                }else{
                    $rootScope.auth = false;
                    $rootScope.username = undefined;
                    return false;
                }
                
			}	
			
		};
}])